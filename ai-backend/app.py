import os
import json
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from dotenv import load_dotenv
from PyPDF2 import PdfReader

try:
    from ibm_watsonx_ai.foundation_models import ModelInference
except Exception:
    ModelInference = None

load_dotenv()

app = Flask(__name__)

CORS(
    app,
    origins="*",
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Content-Type"],
    send_wildcard=True,
    vary_header=True,
    always_send=True,
)

PDF_PATH = os.getenv("PDF_PATH", "./Nafhan_Profile.pdf")

WATSONX_APIKEY = os.getenv("WATSONX_APIKEY")
WATSONX_PROJECT_ID = os.getenv("WATSONX_PROJECT_ID")
WATSONX_URL = os.getenv("WATSONX_URL", "https://jp-tok.ml.cloud.ibm.com")

PDF_TEXT = ""


def load_pdf_text() -> str:
    if not os.path.exists(PDF_PATH):
        print(f"⚠️ PDF not found at {PDF_PATH}")
        return ""
    try:
        reader = PdfReader(PDF_PATH)
        parts = []
        for page in reader.pages:
            parts.append(page.extract_text() or "")
        text = "\n".join(parts)
        print(f"📄 PDF loaded, length: {len(text)}")
        return text
    except Exception as e:
        print(f"⚠️ Failed to read PDF: {e}")
        return ""


def get_llm():
    if ModelInference is None:
        print("⚠️ ModelInference not available.")
        return None
    if not (WATSONX_APIKEY and WATSONX_PROJECT_ID):
        print("⚠️ WATSONX_APIKEY or WATSONX_PROJECT_ID missing.")
        return None

    try:
        llm = ModelInference(
            model_id="meta-llama/llama-3-3-70b-instruct",
            params={
                "decoding_method": "greedy",
                "max_new_tokens": 350,
            },
            credentials={
                "apikey": WATSONX_APIKEY,
                "url": WATSONX_URL,
            },
            project_id=WATSONX_PROJECT_ID,
        )
        print("✅ watsonx model initialized.")
        return llm
    except Exception as e:
        print(f"⚠️ Failed to init watsonx model: {e}")
        return None


def simple_answer_from_pdf(question: str, pdf_text: str) -> str:
    q = (question or "").lower()

    if "siapa" in q or "kenal" in q or "nafhan" in q:
        return (
            "Ini asisten AI dari portfolio Nafhan. "
            "Dia bisa bantu jelaskan project, skill, pengalaman, dan informasi di portfolio ini 🙂"
        )

    if pdf_text:
        first = pdf_text.strip().split("\n")[0][:350]
        return (
            "Mode fallback aktif (watsonx belum tersedia). "
            "Berikut potongan informasi dari profil Nafhan:\n\n"
            + first
            + "\n\nTambahkan kredensial WATSONX_* di Railway untuk jawaban yang lebih pintar dan kontekstual."
        )

    return (
        "Maaf, konteks profil belum tersedia. "
        "Pastikan file PDF dan konfigurasi watsonx sudah terpasang."
    )


PDF_TEXT = load_pdf_text()
LLM = get_llm()


@app.before_request
def global_preflight_handler():
    if request.method == "OPTIONS":
        return make_response("", 204)


@app.after_request
def add_cors_headers(resp):
    origin = request.headers.get("Origin")
    if "Access-Control-Allow-Origin" not in resp.headers:
        resp.headers["Access-Control-Allow-Origin"] = origin or "*"
        resp.headers["Vary"] = "Origin"
    if "Access-Control-Allow-Methods" not in resp.headers:
        resp.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    if "Access-Control-Allow-Headers" not in resp.headers:
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    if "Access-Control-Max-Age" not in resp.headers:
        resp.headers["Access-Control-Max-Age"] = "600"
    return resp


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "ok", "message": "portfolio chatbot running"}), 200


@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return make_response("", 204)

    data = request.get_json(silent=True)
    if not data:
        raw = request.get_data(as_text=True) or ""
        raw = raw.strip()
        if raw:
            if raw.startswith("{"):
                try:
                    data = json.loads(raw)
                except Exception:
                    data = {"message": raw}
            else:
                data = {"message": raw}
        else:
            data = {}

    question = (
        data.get("message")
        or data.get("q")
        or data.get("question")
        or data.get("prompt")
        or data.get("text")
        or ""
    ).strip()

    if not question:
        return (
            jsonify(
                {
                    "reply": "Tolong tulis pertanyaan atau pesan yang ingin kamu tanyakan 🙂"
                }
            ),
            400,
        )

    print(f"💬 Incoming question: {question!r}")

    # Kalau LLM tidak siap, langsung fallback ke PDF
    if LLM is None:
        reply = simple_answer_from_pdf(question, PDF_TEXT)
        return jsonify({"reply": reply}), 200

    # Bangun prompt instruktif
    context_snippet = PDF_TEXT[:4000] if PDF_TEXT else ""
    prompt = (
        "You are an AI assistant embedded in Nafhan's personal portfolio website. "
        "Answer concisely in Indonesian if the user speaks Indonesian, otherwise match their language. "
        "You MUST base answers about Nafhan, his projects, skills, and experience on the context below. "
        "If something is not in the context, answer briefly using general knowledge but stay relevant "
        "to cybersecurity, frontend, CTF, or his portfolio.\n\n"
    )

    if context_snippet:
        prompt += "=== PORTFOLIO CONTEXT START ===\n"
        prompt += context_snippet
        prompt += "\n=== PORTFOLIO CONTEXT END ===\n\n"

    prompt += f"User: {question}\nAssistant:"

    try:
        answer = LLM.generate_text(prompt)
        return jsonify({"reply": answer}), 200
    except Exception as e:
        print(f"⚠️ watsonx error: {e}")
        fallback = simple_answer_from_pdf(question, PDF_TEXT)
        return jsonify(
            {
                "reply": f"{fallback}\n\n(catatan: watsonx error: {e})"
            }
        ), 200


if __name__ == "__main__":
    from waitress import serve

    port = int(os.environ.get("PORT", "8080"))
    print(f"🚀 Serving on 0.0.0.0:{port}")
    serve(app, host="0.0.0.0", port=port)
