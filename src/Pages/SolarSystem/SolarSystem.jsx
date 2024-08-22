import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SolarSystem = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;

    const ambientLight = new THREE.AmbientLight(0xaaaaaa, 2);
    scene.add(ambientLight);

    // Glowing Sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffff00, emissiveIntensity: 1.5 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const sunLight = new THREE.PointLight(0xffffaa, 1.5, 100);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const planetsData = [
      { name: 'Mercury', size: 0.5, distance: 8, color: 0xb0b0b0, orbit: { a: 8, b: 6 }, rings: null },
      { name: 'Venus', size: 0.95, distance: 12, color: 0xffcc66, orbit: { a: 12, b: 10 }, rings: null },
      { name: 'Earth', size: 1, distance: 16, color: 0x3366ff, orbit: { a: 16, b: 14 }, rings: null },
      { name: 'Mars', size: 0.53, distance: 20, color: 0xff3300, orbit: { a: 20, b: 18 }, rings: null },
      { name: 'Jupiter', size: 2, distance: 28, color: 0xff9966, orbit: { a: 28, b: 26 }, rings: null },
      { name: 'Saturn', size: 1.7, distance: 35, color: 0xffcc99, orbit: { a: 35, b: 32 }, rings: { innerRadius: 2.1, outerRadius: 3.5 } },
      { name: 'Uranus', size: 1.2, distance: 42, color: 0x66ccff, orbit: { a: 42, b: 39 }, rings: null },
      { name: 'Neptune', size: 1.1, distance: 50, color: 0x0000ff, orbit: { a: 50, b: 47 }, rings: null },
      { name: 'Pluto', size: 0.2, distance: 58, color: 0x996633, orbit: { a: 58, b: 55 }, rings: null },
    ];

    planetsData.forEach(planet => {
      // Orbit Path - Elliptical
      const curve = new THREE.EllipseCurve(
        0, 0,
        planet.orbit.a,
        planet.orbit.b,
        0, 2 * Math.PI,
        false,
        0
      );

      const points = curve.getPoints(100);
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const ellipse = new THREE.Line(orbitGeometry, orbitMaterial);
      ellipse.rotation.x = Math.PI / 2;
      scene.add(ellipse);

      // Planet
      const planetGeometry = new THREE.SphereGeometry(planet.size, 32, 32);
      const planetMaterial = new THREE.MeshStandardMaterial({ color: planet.color, emissive: planet.color, emissiveIntensity: 0.5 });
      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

      planetMesh.position.x = planet.orbit.a;
      scene.add(planetMesh);

      // Rings (for Saturn only)
      if (planet.rings) {
        const ringGeometry = new THREE.RingGeometry(planet.rings.innerRadius, planet.rings.outerRadius, 64);
        const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        ringMesh.rotation.x = Math.PI / 2;
        planetMesh.add(ringMesh);

        // Glow for the rings
        const ringGlowMaterial = new THREE.ShaderMaterial({
          uniforms: {},
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(0.8, 0.8, 1.0, 1.0) * intensity;
            }
          `,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
          transparent: true,
        });

        const ringGlowMesh = new THREE.Mesh(ringGeometry, ringGlowMaterial);
        ringGlowMesh.scale.multiplyScalar(1.1);
        planetMesh.add(ringGlowMesh);
      }

      // Animate planets
      let planetAngle = 0;

      const animatePlanet = () => {
        planetAngle += 0.01 / planet.orbit.a;
        planetMesh.position.x = planet.orbit.a * Math.cos(planetAngle);
        planetMesh.position.z = planet.orbit.b * Math.sin(planetAngle);
        requestAnimationFrame(animatePlanet);
      };

      animatePlanet();
    });

    camera.position.z = 80;

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default SolarSystem;
