Role: Senior React & Frontend UI/UX Engineer (Mobile-First Specialist). Tech Stack: React, TypeScript, Vite, Three.js (@react-three/fiber), GSAP, Inline CSS. Goal: Refactor the existing Minecraft Portfolio components to be fully Mobile Responsive.

Context: I have a desktop-first Minecraft-themed portfolio. I need to adapt it for mobile devices (screens < 768px). The layout currently breaks on small screens (text too big, flexboxes don't wrap, 3D model zoomed in too close).

Action Items & Requirements by File:

    index.css (Global Styles):

        Add a @media (max-width: 768px) block at the bottom.

        Reduce global font sizes for h1, h2, p.

        Force reduce padding for all <section> elements to 80px 20px to save screen space.

    HeroSection.tsx (3D Camera Adjustment):

        Create a simple useIsMobile hook inside the file to detect if window.innerWidth < 768.

        Camera Logic: If isMobile is true, change the camera position z from 12 to 18 (move it back so the character fits).

        UI Overlay: If isMobile is true, move the Title Text (top) up to 15% so it doesn't overlap the character's face.

    AboutSection.tsx (Layout Stacking):

        Change the main container's flex behavior. Add flexWrap: 'wrap' so the "Avatar Card" and "Stats Table" stack vertically on mobile (instead of side-by-side).

        Ensure the container width is 100% on mobile.

    InventorySection.tsx (Interaction Change):

        Problem: Hover doesn't work on mobile.

        Solution: Change the state logic. Instead of just hoveredItem, use selectedItem.

        Event: Use onClick to select an item (works on both mobile/desktop). Keep onMouseEnter for desktop hover convenience.

        Tooltip: On mobile, do NOT make the tooltip follow the mouse cursor. Instead, make it a Fixed Position Modal at the bottom of the screen (position: fixed; bottom: 20px; left: 50%; translate-x: -50%).

    QuestLogSection.tsx (Book Layout):

        The book has two pages side-by-side. Add flexWrap: 'wrap' to the book container so pages stack vertically on mobile.

        Important: Hide the "Book Binding" (the middle spine div) on mobile screens using a media query or conditional style, as it looks weird when pages are stacked.

    MinecraftFooter.tsx (Padding):

        Reduce vertical padding in the main content area for mobile.

        Ensure the Flex container wraps (flexWrap: 'wrap') so the columns (Brand, Links, Socials) stack vertically.