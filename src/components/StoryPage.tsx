import React, { useState } from 'react';

const StoryPage: React.FC = () => {
  // State untuk navigasi antar "Slide" (Section)
  const [currentStep, setCurrentStep] = useState(0);

  // Data cerita (Slide Content)
  const slides = [
    {
      id: 'intro',
      title: '⚠️ ALERT: INI BUKAN PPT',
      content: (
        <>
          <p className="mb-4">
            "Bikin PPT dong Anak Ibu!"
          </p>
          <p className="text-gray-300 italic">
            &gt; Shafy: Mager buka PowerPoint. Mau ngeprompt pake AI aja.
          </p>
          <p className="mt-4 text-green-400">
            [Tekan NEXT buat mulai Lore-nya]
          </p>
        </>
      ),
      bg: '#1a1a1a', // Dark generic
    },
    {
      id: 'early-game',
      title: '🌱 EARLY GAME: MABA ERA',
      content: (
        <>
          <div className="border-l-4 border-green-500 pl-4 mb-4">
            <h3 className="text-xl text-green-400 font-bold">Stats Awal Kuliah:</h3>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Smoking: <span className="text-red-400">70+ Bungkus (Level 10 Lungs)</span></li>
              <li>Drinking: <span className="text-red-400">0 (Halal Mode)</span></li>
              <li>18+ Activites: <span className="text-green-400">YES (YLLA) (Yang Louvin Louvin Aja)</span></li>
            </ul>
          </div>
          <p>
            Masih polos banget. Knowledge kosong. Cuma modal nekat dan nyali.
          </p>

          {/* Forbidden Items Gallery */}
          <div style={{
            marginTop: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: '15px',
              fontSize: '12px',
              color: '#ff4444',
              textShadow: '2px 2px #000'
            }}>
              ⛔ FORBIDDEN ITEMS ⛔
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '15px'
            }}>
              {/* Drink 1 */}
              <div style={{
                position: 'relative',
                border: '4px solid #8B0000',
                boxShadow: '4px 4px 0px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,0,0,0.3)',
                overflow: 'hidden',
                backgroundColor: '#1a0000'
              }}>
                <img 
                  src="/drink1.jpeg" 
                  alt="Drink 1 - Forbidden"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    filter: 'grayscale(80%) brightness(0.5)',
                    opacity: 0.6
                  }}
                />
                {/* X Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '60px',
                  color: '#ff0000',
                  textShadow: '4px 4px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                  zIndex: 2
                }}>
                  ✕
                </div>
                {/* Blocked Text */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(139, 0, 0, 0.9)',
                  padding: '5px 10px',
                  border: '2px solid #ff0000',
                  fontSize: '10px',
                  color: '#fff',
                  textShadow: '1px 1px #000',
                  zIndex: 2
                }}>
                  BLOCKED
                </div>
              </div>

              {/* Drink 2 */}
              <div style={{
                position: 'relative',
                border: '4px solid #8B0000',
                boxShadow: '4px 4px 0px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,0,0,0.3)',
                overflow: 'hidden',
                backgroundColor: '#1a0000'
              }}>
                <img 
                  src="/drink2.jpeg" 
                  alt="Drink 2 - Forbidden"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    filter: 'grayscale(80%) brightness(0.5)',
                    opacity: 0.6
                  }}
                />
                {/* X Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '60px',
                  color: '#ff0000',
                  textShadow: '4px 4px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                  zIndex: 2
                }}>
                  ✕
                </div>
                {/* Blocked Text */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(139, 0, 0, 0.9)',
                  padding: '5px 10px',
                  border: '2px solid #ff0000',
                  fontSize: '10px',
                  color: '#fff',
                  textShadow: '1px 1px #000',
                  zIndex: 2
                }}>
                  BLOCKED
                </div>
              </div>
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: '10px',
              fontSize: '10px',
              color: '#55ff55',
              textShadow: '1px 1px #000'
            }}>
              ✓ Halal Mode: ACTIVATED
            </div>
          </div>
        </>
      ),
      bg: '#2e2016', // Dirt block colorish
    },
    {
      id: 'ex-story',
      title: '💔 CANON EVENT: NAFHAN BROKEN HEART 💔',
      content: (
        <>
          <div style={{
            display: 'flex',
            gap: '15px',
            marginTop: '20px',
            marginBottom: '20px',
            alignItems: 'flex-start'
          }}>
            {/* Kolom Kiri */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flex: '1'
            }}>
              <img 
                src="/zeer1.jpeg" 
                alt="Zeer 1"
                style={{
                  width: '100%',
                  height: '180px',
                  border: '3px solid #8B4513',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/zeer2.JPG" 
                alt="Zeer 2"
                style={{
                  width: '100%',
                  height: '180px',
                  border: '3px solid #8B4513',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                  objectFit: 'cover'
                }}
              />
            </div>

            {/* Kolom Kanan */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              flex: '1'
            }}>
              <img 
                src="/zeer4.JPG" 
                alt="Zeer 3"
                style={{
                  width: '100%',
                  height: '180px',
                  border: '3px solid #8B4513',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                  objectFit: 'cover'
                }}
              />
              <img 
                src="/zeer3.JPG" 
                alt="Zeer 4"
                style={{
                  width: '100%',
                  height: '180px',
                  border: '3px solid #8B4513',
                  boxShadow: '4px 4px 0px rgba(0,0,0,0.5)',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>

          {/* Deleted Conversation UI */}
          <div style={{
            backgroundColor: 'rgba(50, 50, 50, 0.8)',
            border: '4px solid #666',
            padding: '15px',
            marginTop: '20px',
            marginBottom: '20px',
            boxShadow: '4px 4px 0px rgba(0,0,0,0.5)'
          }}>
            {/* Chat Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '15px',
              paddingBottom: '10px',
              borderBottom: '2px solid #888'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#8B0000',
                border: '2px solid #ff0000',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                💬
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Chat + Content</div>
                <div style={{ fontSize: '8px', color: '#999' }}>Status: DELETED</div>
              </div>
            </div>

            {/* Deleted Message Box */}
            <div style={{
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              border: '3px solid #444',
              padding: '15px',
              position: 'relative',
              minHeight: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '10px'
            }}>
              {/* Diagonal Stripe Pattern (Deleted Effect) */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,0,0,0.1) 10px, rgba(255,0,0,0.1) 20px)',
                pointerEvents: 'none'
              }} />
              
              <div style={{
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  fontSize: '24px',
                  marginBottom: '8px',
                  opacity: 0.5
                }}>
                  🗑️
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#888',
                  textDecoration: 'line-through',
                  opacity: 0.6
                }}>
                  [Messages have been deleted]
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#ff4444',
                  marginTop: '10px',
                  fontStyle: 'italic'
                }}>
                  Maaf banget full percakapannya udah didelete
                </div>
              </div>
            </div>

            {/* Empty Chat Lines (Placeholder Effect) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {[1, 2, 3].map((_, idx) => (
                <div 
                  key={idx}
                  style={{
                    height: '12px',
                    backgroundColor: 'rgba(60, 60, 60, 0.5)',
                    borderRadius: '2px',
                    opacity: 0.3,
                    width: idx === 2 ? '60%' : idx === 1 ? '80%' : '100%'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="bg-red-900/50 p-2 border-2 border-red-500 mt-4 text-center">
            <span className="block text-2xl">💔</span>
            <span className="text-xs text-red-300"> Heart Damage: Critical</span>
          </div>
        </>
      ),
      bg: '#2b0000', // Dark red
    },
    {
      id: 'hmif',
      title: '🛡️ QUEST COMPLETE: HMIF',
      content: (
        <>
          <p className="mb-4 text-yellow-300">
            *** ACHIEVEMENT UNLOCKED ***
          </p>
          <h2 className="text-2xl font-bold mb-2">Diterima di HMIF</h2>
          <p>
            Akhirnya masuk Guild resmi. Bukan sekedar himpunan, ini tempat grinding skill sebenernya.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 border-2 border-white"></div>
            <span>Equipped: Jaket Himpunan (Protection +10) (Aura +10)</span>
          </div>
        </>
      ),
      bg: '#002b36', // Techy blue
    },
    {
      id: 'loss',
      title: '💀 EVENT: THE LOSS',
      content: (
        <>
          <p className="mb-4">
            Dalam perjalanan ini, ada momen-momen <span className="text-red-400 font-bold">sulit</span> yang harus dihadapi.
          </p>
          <p className="mb-4 text-sm">
            Kehilangan orang dan makhluk yang dicintai. Ini bagian dari perjalanan hidup yang pahit tapi harus diterima.
          </p>

          {/* Memorial Gallery */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
            marginTop: '25px',
            marginBottom: '25px'
          }}>
            {/* Abang Asuh */}
            <div style={{
              position: 'relative',
              textAlign: 'center'
            }}>
              <img 
                src="/abang2an.jpeg" 
                alt="Aidan"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1/1',
                  border: '4px solid #4a0000',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.5), inset 0 0 20px rgba(139,0,0,0.3)',
                  objectFit: 'cover',
                  backgroundColor: '#1a0000',
                  filter: 'grayscale(30%) brightness(0.7)'
                }}
              />
              <div style={{
                marginTop: '10px',
                fontSize: '10px',
                color: '#ff6666',
                textShadow: '1px 1px #000'
              }}>
                Aidan Fathullah
              </div>
            </div>

            {/* Makam Kucing */}
            <div style={{
              position: 'relative',
              textAlign: 'center'
            }}>
              <img 
                src="/makamkucing.jpeg" 
                alt="Makam Kucing"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1/1',
                  border: '4px solid #4a0000',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.5), inset 0 0 20px rgba(139,0,0,0.3)',
                  objectFit: 'cover',
                  backgroundColor: '#1a0000',
                  filter: 'grayscale(30%) brightness(0.7)'
                }}
              />
              <div style={{
                marginTop: '10px',
                fontSize: '10px',
                color: '#ff6666',
                textShadow: '1px 1px #000'
              }}>
                Makam Miki
              </div>
            </div>

            {/* Kucing Kesayangan */}
            <div style={{
              position: 'relative',
              textAlign: 'center'
            }}>
              <img 
                src="/kucing.jpeg" 
                alt="Kucing Kesayangan"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '1/1',
                  border: '4px solid #4a0000',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.5), inset 0 0 20px rgba(139,0,0,0.3)',
                  objectFit: 'cover',
                  backgroundColor: '#1a0000',
                  filter: 'grayscale(30%) brightness(0.7)'
                }}
              />
              <div style={{
                marginTop: '10px',
                fontSize: '10px',
                color: '#ff6666',
                textShadow: '1px 1px #000'
              }}>
                Miki
              </div>
            </div>
          </div>

          {/* Memorial Message */}
          <div style={{
            backgroundColor: 'rgba(139, 0, 0, 0.3)',
            border: '3px solid #8B0000',
            padding: '15px',
            marginTop: '20px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#ff9999',
              marginBottom: '8px',
              textShadow: '1px 1px #000'
            }}>
              🕯️ IN MEMORIAM 🕯️
            </div>
            <div style={{
              fontSize: '9px',
              color: '#ccc',
              lineHeight: '1.6'
            }}>
              Mereka yang telah pergi meninggalkan kenangan indah.<br/>
              Semoga mereka tenang di sisi-Nya.
            </div>
          </div>
        </>
      ),
      bg: '#1a0000', // Very dark red/black
    },
    {
      id: 'gunung',
      title: '⛰️ SIDE QUEST: MOUNTAIN CLIMBING',
      content: (
        <>
          <p className="mb-4">
            Setelah HMIF, ada side quest yg gw ambil: <span className="text-green-400 font-bold">Naik Gunung</span>.
          </p>
          <p className="mb-4 text-sm">
            Kadang perlu break dari grind coding, jadi gw jalan-jalan ke alam.
          </p>

          {/* Mountain Gallery - Side by Side for 4x6 images */}
          <div style={{
            display: 'flex',
            gap: '15px',
            marginTop: '20px',
            marginBottom: '20px',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}>
            {/* Gunung 1 */}
            <div style={{
              flex: '1',
              maxWidth: '300px',
              position: 'relative'
            }}>
              <img 
                src="/gunung1.jpeg" 
                alt="Gunung 1"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '4/6',
                  border: '4px solid #8B4513',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
                  objectFit: 'cover',
                  backgroundColor: '#2e2016'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(34, 139, 34, 0.9)',
                padding: '5px 12px',
                border: '2px solid #228B22',
                fontSize: '9px',
                color: '#fff',
                textShadow: '1px 1px #000',
                whiteSpace: 'nowrap'
              }}>
                QUEST LOG: ACTIVE
              </div>
            </div>

            {/* Gunung 2 */}
            <div style={{
              flex: '1',
              maxWidth: '300px',
              position: 'relative'
            }}>
              <img 
                src="/gunung2.jpeg" 
                alt="Gunung 2"
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '4/6',
                  border: '4px solid #8B4513',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
                  objectFit: 'cover',
                  backgroundColor: '#2e2016'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(34, 139, 34, 0.9)',
                padding: '5px 12px',
                border: '2px solid #228B22',
                fontSize: '9px',
                color: '#fff',
                textShadow: '1px 1px #000',
                whiteSpace: 'nowrap'
              }}>
                QUEST LOG: ACTIVE
              </div>
            </div>
          </div>

          {/* Stats Box */}
          <div style={{
            backgroundColor: 'rgba(34, 139, 34, 0.2)',
            border: '3px solid #228B22',
            padding: '12px',
            marginTop: '30px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '10px', color: '#90EE90', marginBottom: '5px' }}>
              ⚡ ACHIEVEMENT: NATURE ENTHUSIAST
            </div>
            <div style={{ fontSize: '9px', color: '#fff' }}>
              Stamina +10 | Mental Health +20 | Photography Skill +5
            </div>
          </div>
        </>
      ),
      bg: '#1a3a1a', // Forest green
    },
    {
      id: 'gdg',
      title: '🌏 QUEST: SINGAPORE & GOOGLE DEVELOPER FEST',
      content: (
        <>
          <p className="mb-4">
            Perjalanan ke <span className="text-blue-400 font-bold">Singapore</span> untuk menghadiri <span className="text-green-400 font-bold">Google Developer Fest</span>.
          </p>

          {/* Google Developer Fest Gallery */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginTop: '25px',
            marginBottom: '25px'
          }}>
            {/* GGL Image */}
            <div style={{
              position: 'relative',
              textAlign: 'center'
            }}>
              <img 
                src="/ggl.jpg" 
                alt="Google Developer Fest"
                style={{
                  width: '100%',
                  height: 'auto',
                  border: '4px solid #4285F4',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
                  objectFit: 'cover',
                  backgroundColor: '#1a1a2e'
                }}
              />
              <div style={{
                marginTop: '10px',
                fontSize: '10px',
                color: '#4285F4',
                textShadow: '1px 1px #000'
              }}>
                Google Developer Fest
              </div>
            </div>

            {/* Leaderboard Image */}
            <div style={{
              position: 'relative',
              textAlign: 'center'
            }}>
              <img 
                src="/no1.jpg" 
                alt="Top 1 Leaderboard"
                style={{
                  width: '100%',
                  height: 'auto',
                  border: '4px solid #4285F4',
                  boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
                  objectFit: 'cover',
                  backgroundColor: '#1a1a2e'
                }}
              />
              <div style={{
                marginTop: '10px',
                fontSize: '10px',
                color: '#4285F4',
                textShadow: '1px 1px #000'
              }}>
                Top 1 Leaderboard
              </div>
            </div>
          </div>

          {/* Achievement Box */}
          <div style={{
            backgroundColor: 'rgba(66, 133, 244, 0.2)',
            border: '4px solid #4285F4',
            padding: '15px',
            marginTop: '25px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#8AB4F8',
              marginBottom: '8px',
              textShadow: '1px 1px #000'
            }}>
              🏆 ACHIEVEMENT UNLOCKED 🏆
            </div>
            <div style={{
              fontSize: '14px',
              color: '#FFD700',
              fontWeight: 'bold',
              marginBottom: '5px',
              textShadow: '2px 2px #000'
            }}>
              TOP 1 LEADERBOARD
            </div>
            <div style={{
              fontSize: '10px',
              color: '#fff',
              lineHeight: '1.6'
            }}>
              Google Developer Group ITB<br/>
              Coding Skill +50 | Networking +30 | Confidence +40
            </div>
          </div>
        </>
      ),
      bg: '#1a1a2e', // Dark blue-purple (Google colors inspired)
    },
    {
      id: 'naila',
      title: '💎 END GAME: THE PRIZE',
      content: (
        <>
          <p className="mb-2">
            Setelah melewati lembah kegelapan dan dungeon kampus...
          </p>
          <div className="bg-yellow-600/20 border-4 border-yellow-500 p-4 text-center animate-pulse">
            <h1 className="text-3xl font-bold text-yellow-400">NAILA LATISHA PUTRI NOEGRAHA</h1>
            <p className="text-sm mt-1 text-white">FIA Niaga UI 2024</p>
          </div>
          <p className="mt-4 text-sm">
            <span className="text-green-400 italic">She is the Diamond in my inventory.</span>
          </p>
        </>
      ),
      bg: '#2e0b36', // End dimension color
    },
    {
      id: 'questions',
      title: '❓ ANY QUESTIONS?',
      content: (
        <>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <div style={{
              fontSize: '32px',
              marginBottom: '20px'
            }}>
              ❓
            </div>
            <h2 style={{
              fontSize: '24px',
              color: '#FFD700',
              textShadow: '3px 3px #000',
              marginBottom: '15px'
            }}>
              Ada pertanyaan?
            </h2>
            <p style={{
              fontSize: '12px',
              color: '#ccc',
              lineHeight: '1.8'
            }}>
              Silakan tanyakan apapun yang ingin kalian tahu! <br/>
              Gw akan jawab dengan sebaik-baiknya.
            </p>
          </div>

          {/* Contact Info */}
          <div style={{
            backgroundColor: 'rgba(139, 69, 19, 0.3)',
            border: '3px solid #8B4513',
            padding: '20px',
            marginTop: '30px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '11px',
              color: '#FFD700',
              marginBottom: '10px'
            }}>
              💬 CONTACT INFO
            </div>
            <div style={{
              fontSize: '9px',
              color: '#fff',
              lineHeight: '1.6'
            }}>
              Instagram: @nafhanshafy <br/>
              Email: nafhan.sh@gmail.com <br/>
              Website: nafhan.space
            </div>
          </div>

          {/* Thank You Message */}
          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            padding: '15px',
            backgroundColor: 'rgba(34, 139, 34, 0.2)',
            border: '2px solid #228B22',
            borderRadius: '4px'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#90EE90',
              textShadow: '2px 2px #000'
            }}>
              Terima kasih sudah menyimak! 🎉
            </div>
          </div>
        </>
      ),
      bg: '#1a1a2e', // Dark purple-blue
    },
  ];

  const handleNext = () => {
    if (currentStep < slides.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Styles object
  const styles = {
    container: {
      fontFamily: '"Press Start 2P", cursive, monospace', // Font Pixel
      backgroundColor: slides[currentStep].bg,
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      transition: 'background-color 0.5s ease',
      position: 'relative' as const,
      overflow: 'auto',
    },
    card: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      border: '4px solid #c6c6c6', // Minecraft GUI gray
      boxShadow: '8px 8px 0px rgba(0,0,0,0.5)',
      padding: '30px',
      maxWidth: '800px',
      width: '100%',
      position: 'relative' as const,
      imageRendering: 'pixelated' as const,
    },
    headerBar: {
      backgroundColor: '#575757',
      padding: '10px',
      marginBottom: '20px',
      borderBottom: '4px solid #383838',
      textAlign: 'center' as const,
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px',
    },
    mcButton: {
      backgroundColor: '#727272',
      borderTop: '4px solid #dbdbdb',
      borderLeft: '4px solid #dbdbdb',
      borderRight: '4px solid #555',
      borderBottom: '4px solid #555',
      color: 'white',
      padding: '10px 20px',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '14px',
      textTransform: 'uppercase' as const,
    },
    progressBar: {
      position: 'absolute' as const,
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '5px',
    }
  };

  return (
    <>
      {/* Import Font dari Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
          
          /* Animasi kedip untuk kursor atau teks */
          @keyframes blink {
            50% { opacity: 0; }
          }
          .typing-cursor::after {
            content: '_';
            animation: blink 1s step-start infinite;
          }
        `}
      </style>

      <div style={styles.container}>
        
        {/* Dekorasi Background (Floating Items) */}
        {slides[currentStep].id !== 'naila' && (
          <>
            <div style={{position: 'absolute', top: '10%', left: '10%', opacity: 0.2, fontSize: '4rem'}}>⚔️</div>
            <div style={{position: 'absolute', bottom: '20%', right: '10%', opacity: 0.2, fontSize: '4rem'}}>🍎</div>
          </>
        )}

        {/* Floating Images Naila - hanya muncul di slide naila */}
        {slides[currentStep].id === 'naila' && (
          <>
            {/* Naila 1 - Kiri Atas */}
            <img 
              src="/naila1.JPG" 
              alt="Naila 1"
              style={{
                position: 'absolute',
                top: '8%',
                left: '5%',
                width: '140px',
                height: 'auto',
                aspectRatio: '9/16',
                border: '4px solid #FFD700',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
                objectFit: 'cover',
                backgroundColor: '#2e0b36',
                zIndex: 1,
                opacity: 0.9
              }}
            />
            {/* Naila 2 - Kiri Bawah */}
            <img 
              src="/naila2.JPG" 
              alt="Naila 2"
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '3%',
                width: '140px',
                height: 'auto',
                aspectRatio: '9/16',
                border: '4px solid #FFD700',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
                objectFit: 'cover',
                backgroundColor: '#2e0b36',
                zIndex: 1,
                opacity: 0.9
              }}
            />
            {/* Naila 3 - Kanan Atas */}
            <img 
              src="/nail3.jpeg" 
              alt="Naila 3"
              style={{
                position: 'absolute',
                top: '10%',
                right: '4%',
                width: '140px',
                height: 'auto',
                aspectRatio: '9/16',
                border: '4px solid #FFD700',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
                objectFit: 'cover',
                backgroundColor: '#2e0b36',
                zIndex: 1,
                opacity: 0.9
              }}
            />
            {/* Naila 4 - Kanan Bawah */}
            <img 
              src="/naila4.jpeg" 
              alt="Naila 4"
              style={{
                position: 'absolute',
                bottom: '12%',
                right: '6%',
                width: '140px',
                height: 'auto',
                aspectRatio: '9/16',
                border: '4px solid #FFD700',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.5)',
                objectFit: 'cover',
                backgroundColor: '#2e0b36',
                zIndex: 1,
                opacity: 0.9
              }}
            />
          </>
        )}

        {/* Website Nembak Button - hanya muncul di slide naila */}
        {slides[currentStep].id === 'naila' && (
          <div style={{
            marginBottom: '20px',
            textAlign: 'center',
            zIndex: 10,
            position: 'relative'
          }}>
            <a 
              href="https://bromo.nafhan.space"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              <div style={{
                backgroundColor: '#8B4513',
                border: '4px solid #4e270a',
                padding: '12px 24px',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '8px 8px 0px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '6px 6px 0px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              >
                <div style={{
                  fontSize: '12px',
                  color: '#FFD700',
                  fontWeight: 'bold',
                  textShadow: '2px 2px #000',
                  marginBottom: '4px'
                }}>
                  💌 SPECIAL EVENT
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#fff',
                  textShadow: '1px 1px #000'
                }}>
                  Website Nembak - 2 Januari 2026
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Main Card */}
        {slides[currentStep].id === 'naila' ? (
          <div style={styles.card}>
            <div style={styles.headerBar}>
              <h2 style={{margin: 0, fontSize: '18px', textShadow: '2px 2px #000'}}>
                {slides[currentStep].title}
              </h2>
            </div>

            <div style={{lineHeight: '1.6', fontSize: '14px'}}>
              {slides[currentStep].content}
            </div>

            {/* Navigation Buttons */}
            <div style={styles.buttonGroup}>
              <button 
                onClick={handleBack} 
                style={{...styles.mcButton, visibility: currentStep === 0 ? 'hidden' : 'visible'}}
              >
                &lt; Back
              </button>
              <button 
                onClick={handleNext}
                style={{...styles.mcButton, display: currentStep === slides.length - 1 ? 'none' : 'block'}}
              >
                Next &gt;
              </button>
              {currentStep === slides.length - 1 && (
                <button 
                  onClick={() => alert("GGWP! Presentasi Selesai.")}
                  style={{...styles.mcButton, backgroundColor: '#5c9634'}}
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        ) : slides[currentStep].id === 'ex-story' ? (
          /* Layout khusus untuk slide ex-story dengan QR code di kanan */
          <div style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1600px',
            padding: '0 40px'
          }}>
            {/* Main Card */}
            <div style={{
              ...styles.card,
              flex: '1 1 auto',
              maxWidth: '800px'
            }}>
              <div style={styles.headerBar}>
                <h2 style={{margin: 0, fontSize: '18px', textShadow: '2px 2px #000'}}>
                  {slides[currentStep].title}
                </h2>
              </div>

              <div style={{lineHeight: '1.6', fontSize: '14px'}}>
                {slides[currentStep].content}
              </div>

              {/* Navigation Buttons */}
              <div style={styles.buttonGroup}>
                <button 
                  onClick={handleBack} 
                  style={{...styles.mcButton, visibility: currentStep === 0 ? 'hidden' : 'visible'}}
                >
                  &lt; Back
                </button>
                <button 
                  onClick={handleNext}
                  style={{...styles.mcButton, display: currentStep === slides.length - 1 ? 'none' : 'block'}}
                >
                  Next &gt;
                </button>
                {currentStep === slides.length - 1 && (
                  <button 
                    onClick={() => alert("GGWP! Presentasi Selesai.")}
                    style={{...styles.mcButton, backgroundColor: '#5c9634'}}
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>

            {/* QR Code - Di Kanan, Centered Vertically */}
            <div style={{
              flex: '0 0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px'
            }}>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '5px solid #8B4513',
                padding: '20px',
                boxShadow: '8px 8px 0px rgba(0,0,0,0.5)',
                textAlign: 'center'
              }}>
                <img 
                  src="/qr.png" 
                  alt="QR Code - Full Story"
                  style={{
                    width: '280px',
                    height: '280px',
                    border: '3px solid #FFD700',
                    backgroundColor: '#fff',
                    padding: '8px',
                    display: 'block'
                  }}
                />
                <div style={{
                  marginTop: '15px',
                  fontSize: '11px',
                  color: '#FFD700',
                  textShadow: '2px 2px #000',
                  lineHeight: '1.4'
                }}>
                  📱 Scan untuk baca<br/>
                  cerita fullnya!
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Layout Normal untuk slide lainnya */
          <div style={styles.card}>
            <div style={styles.headerBar}>
              <h2 style={{margin: 0, fontSize: '18px', textShadow: '2px 2px #000'}}>
                {slides[currentStep].title}
              </h2>
            </div>

            <div style={{lineHeight: '1.6', fontSize: '14px'}}>
              {slides[currentStep].content}
            </div>

            {/* Navigation Buttons */}
            <div style={styles.buttonGroup}>
              <button 
                onClick={handleBack} 
                style={{...styles.mcButton, visibility: currentStep === 0 ? 'hidden' : 'visible'}}
              >
                &lt; Back
              </button>
              <button 
                onClick={handleNext}
                style={{...styles.mcButton, display: currentStep === slides.length - 1 ? 'none' : 'block'}}
              >
                Next &gt;
              </button>
              {currentStep === slides.length - 1 && (
                <button 
                  onClick={() => alert("GGWP! Presentasi Selesai.")}
                  style={{...styles.mcButton, backgroundColor: '#5c9634'}}
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        )}

        {/* Experience Bar (Progress) */}
        <div style={styles.progressBar}>
          {slides.map((_, index) => (
            <div 
              key={index}
              style={{
                width: '30px',
                height: '10px',
                backgroundColor: index <= currentStep ? '#55ff55' : '#333',
                border: '2px solid #000'
              }}
            />
          ))}
        </div>

        <div style={{marginTop: '20px', fontSize: '10px', opacity: 0.5}}>
          Minecraft Story Mode v1.0 • Made with ☕ & Mager
        </div>
      </div>
    </>
  );
};

export default StoryPage;