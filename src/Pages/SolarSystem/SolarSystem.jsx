import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SolarSystem = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create the sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Create a planet
    const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);


    // Orbit and rotation settings
    let planetAngle = 0;
    const orbitRadius = 10;
    
    camera.position.z = 20;

    const animate = function () {
      requestAnimationFrame(animate);

      // Planet orbit animation
      planetAngle += 0.01;
      planet.position.x = orbitRadius * Math.cos(planetAngle);
      planet.position.z = orbitRadius * Math.sin(planetAngle);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup function to remove the renderer and dispose of resources
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default SolarSystem;
