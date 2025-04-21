/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";
import * as THREE from "three";
import Globe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const generateRandomArc = () => {
  const randomCoord = () => 180 - Math.random() * 360;
  const randomLat = () => 90 - Math.random() * 180;
  const colors = ["#8b5cf6", "#a78bfa", "#c4b5fd"]; // Violet shades to match the theme
  const color = colors[Math.floor(Math.random() * colors.length)];
  return {
    startLat: randomLat(),
    startLng: randomCoord(),
    endLat: randomLat(),
    endLng: randomCoord(),
    color,
  };
};

const InteractiveGlobe = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const textGroupRef = useRef<THREE.Group | null>(null);
  if (typeof window !== 'undefined') {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!mountRef.current) return;

    // Get container dimensions
    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight || 500; // Fallback height

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Renderer setup with container dimensions
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Make background transparent
    });
    renderer.setSize(containerWidth, containerHeight);
    if (typeof window !== "undefined") {
      renderer.setPixelRatio(window.devicePixelRatio);
    }
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    camera.position.z = 200;
    cameraRef.current = camera;

    // Orbit controls (client-side)
    if (typeof window !== "undefined") {
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enableZoom = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controlsRef.current = controls;
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Add point light to make text more visible
    const pointLight = new THREE.PointLight(0x00ffff, 2, 100);
    pointLight.position.set(0, 0, 0); // Light from center of globe
    scene.add(pointLight);

    // Globe creation
    const globe = new Globe()
      .globeImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-dark.jpg"
      )
      .bumpImageUrl(
        "https://unpkg.com/three-globe/example/img/earth-topology.png"
      )
      .arcsData([]) // Empty arcs initially
      .arcColor("color")
      .arcAltitude(0.2)
      .arcStroke(1)
      .arcDashLength(0.4)
      .arcDashGap(4)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(100);

    // Scale the globe to fit the container
    globe.scale.set(1.2, 1.2, 1.2);
    scene.add(globe);
    globeRef.current = globe;

    // Add initial arcs
    const initialArcs = Array.from({ length: 10 }, generateRandomArc);
    globe.arcsData(initialArcs);

    // Add new arcs periodically
    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const newArcs = Array.from({ length: 3 }, generateRandomArc);
      const currentArcs = globeRef.current.arcsData();
      const updatedArcs = [...currentArcs, ...newArcs].slice(-30);
      globeRef.current.arcsData(updatedArcs);
    }, 1000);

    // Resize handling
    const onWindowResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight || 500;

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", onWindowResize);
    }

    // Animation loop
    const animate = () => {
      if (
        !controlsRef.current ||
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current
      )
        return;

      // Rotate text group independently of globe rotation
      if (textGroupRef.current) {
        textGroupRef.current.rotation.y -= 0.005; // Text moves along equator
      }

      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      clearInterval(interval);
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", onWindowResize);
      }
      if (controlsRef.current) controlsRef.current.dispose();
      if (rendererRef.current) rendererRef.current.dispose();
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, []);
}

  return <div ref={mountRef} className="w-full h-full min-h-[500px]" />;
};

export default InteractiveGlobe;
