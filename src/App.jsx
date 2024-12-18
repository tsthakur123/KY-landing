import { Canvas } from "@react-three/fiber";
import "./App.css";
import { OrbitControls } from "@react-three/drei";
import Cyl from "./Cyl";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const carouselRef = useRef(null);
  // Array of video sources
  const videos = [
    "https://www.worldquant.com/wp-content/uploads/2022/04/Cut_D.mp4",
    "https://www.worldquant.com/wp-content/uploads/2022/04/Cut_E2.mp4",
    "https://www.worldquant.com/wp-content/uploads/2022/04/Cut_F.mp4",
    "https://www.worldquant.com/wp-content/uploads/2022/04/Cut_G2.mp4",
  ];

  // State to track the current video index
  const [currentVideo, setCurrentVideo] = useState(0);
  const handleVideoEnd = () => {
    // Increment video index, reset to 0 if it's the last video
    setCurrentVideo((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useGSAP(() => {
    // GSAP animation for scrolling text
    gsap.fromTo(
      carouselRef.current,
      { x: "0%" }, // Start from right side of the container
      {
        x: "-100%", // End at left side of the container
        duration: 15,
        repeat: -1, // Infinite loop
        ease: "linear",
      }
    );
  }, []);

  useGSAP(() => {
    gsap.set(canvasRef.current, {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from(canvasRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: canvasRef.current,
        start: "center center",
        end: "bottom center",
        scrub: true,
        invalidateOnRefresh: true,
        immediateRender: false,
      },
    });
  });

  const canvasRef = useRef();

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // Normalize to [-1, 1]
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -2; // Normalize to [-1, 1], inverted for Three.js
    const mousePosition = { x, y };

    // Pass mouse position to the cylinder using a custom event
    const event = new CustomEvent("mouseMoveOnCanvas", {
      detail: mousePosition,
    });
    window.dispatchEvent(event);
  };
  return (
    <>
    <div>
      <div ref={canvasRef} onMouseMove={handleMouseMove} className="w-full h-screen relative mask-clip-path z-10 absolute-center">
        <div className="w-full h-screen absolute overflow-hidden">
          <video
            src={videos[currentVideo]}
            key={videos[currentVideo]}
            onEnded={handleVideoEnd}
            autoPlay
            muted
          ></video>
        </div>
        <div className="text-white text-[20vw] mix-blend-difference font-[] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Kashiyatra
        </div>
        <div className="w-full h-12 absolute bottom-0 overflow-x-hidden">
          <div
            ref={carouselRef}
            className="text-zinc-500 mix-blend-difference opacity-50 text-3xl font-bold whitespace-nowrap flex gap-12 w-full"
          >
            <p>Cultural heartbeat of IIT Varanasi!</p>
            <p>Dive into the ultimate cultural fest of IIT Varanasi!</p>
            <p>Unleash the rhythm of Kashiyatra 2025</p>
            <p>Step into a world of vibrant expressions!</p>
            <p>Unleash the magic, live the culture!</p>
          </div>
        </div>{" "}
        {/* Canvas section takes full viewport height */}
        <Canvas flat camera={{ fov: 35 }}>
          {" "}
          {/* Increased FOV for better visibility */}
          <OrbitControls enableZoom={false} />
          <ambientLight />
          <directionalLight intensity={1.5} position={[5, 5, 5]} castShadow />
          <Cyl />
          <EffectComposer>
            <Bloom
              mipmapBlur
              intensity={1} // Reduced intensity to avoid washing out the scene
              luminanceThreshold={0} // Lowered threshold to capture more luminance for bloom
              luminanceSmoothing={0.5} // Increased smoothness for a softer bloom effect
            />
          </EffectComposer>
        </Canvas>
        {/* Carousel Section */}
      </div>
      <div className="text-black text-[20vw] font-[] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Kashiyatra
      </div>
    </div>
      <div className="w-full h-screen bg-white">
        {" "}
        {/* This will allow scrolling */}
        {/* Add more content here to ensure the page is scrollable */}
      </div>
    </>
  );
}

export default App;
