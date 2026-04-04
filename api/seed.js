import 'dotenv/config';
import mongoose from 'mongoose';
import Hero from './models/Hero.js';
import Skill from './models/Skill.js';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Training from './models/Training.js';
import Education from './models/Education.js';
import Quote from './models/Quote.js';
import ContactInfo from './models/ContactInfo.js';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Clear all
  await Promise.all([
    Hero.deleteMany(),
    Skill.deleteMany(),
    Project.deleteMany(),
    Experience.deleteMany(),
    Training.deleteMany(),
    Training.deleteMany(),
    Education.deleteMany(),
    Quote.deleteMany(),
    ContactInfo.deleteMany(),
  ]);

  // Hero
  await Hero.create({
    name: 'CHAKROUN MOHAMED',
    badge: 'Précision & Leadership',
    tagline: 'Ingénieur mécanique, doté d’excellentes compétences en communication et d’une grande capacité d’adaptation. Passionné par le travail en équipe et motivé par l’atteinte d’objectifs collectifs.',
    statValue: '50+',
    statLabel: 'Formations Animées',
    btnPrimaryLabel: 'DÉCOUVRIR LE GÉNIE',
    btnPrimaryHref: '#engineering',
    btnSecondaryLabel: 'PARCOURS JCI',
    btnSecondaryHref: '#training',
  });
  console.log('✅ Hero seeded');

  // Skills
  await Skill.insertMany([
    { name: 'SolidWorks', category: 'CFAO', type: 'hard', order: 0 },
    { name: 'Catia', category: 'CFAO', type: 'hard', order: 1 },
    { name: 'NX', category: 'CFAO', type: 'hard', order: 2 },
    { name: 'Master-cam', category: 'CFAO', type: 'hard', order: 3 },
    { name: 'Python', category: 'Programmation', type: 'hard', order: 4 },
    { name: 'C++', category: 'Programmation', type: 'hard', order: 5 },
    { name: 'Leadership', category: 'Savoir-être', type: 'soft', icon: 'Users', order: 0 },
    { name: 'Conférencier', category: 'Savoir-être', type: 'soft', icon: 'Cpu', order: 1 },
    { name: 'Communication', category: 'Savoir-être', type: 'soft', icon: 'Cpu', order: 2 },
    { name: 'Adaptabilité', category: 'Savoir-être', type: 'soft', icon: 'Shield', order: 3 },
    { name: 'Travail en équipe', category: 'Savoir-être', type: 'soft', icon: 'Users', order: 4 },
    { name: 'Objectifs collectifs', category: 'Savoir-être', type: 'soft', icon: 'Layout', order: 5 },
  ]);
  console.log('✅ Skills seeded');

  // Projects - Adding images
  await Project.insertMany([
    { 
      title: 'Vireur de Soudure', 
      desc: 'Maintenir et faire pivoter des gaines métallique durant le soudage avec sécurité et précision.', 
      tags: ['Soudage', 'Précision', 'Mécanique'], 
      icon: 'Settings', 
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',
      order: 0 
    },
    { 
      title: 'Machine d\'injection Résine', 
      desc: 'Amélioration et conception d’une machine d’injection de résine d’un siège auto pour SPARCO.', 
      tags: ['SPARCO', 'RDM', 'Automate'], 
      icon: 'Cpu', 
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      order: 1 
    },
    { 
      title: 'Chariot d\'Atelier', 
      desc: 'Conception complète pour faciliter le déplacement des pièces et l\'organisation de l\'atelier.', 
      tags: ['Ergonomie', 'Organisation'], 
      icon: 'Layout', 
      image: 'https://images.unsplash.com/photo-1530124560676-579998843940?auto=format&fit=crop&w=800&q=80',
      order: 2 
    },
    { 
      title: 'Moule de Corniche BN4', 
      desc: 'Conception technique de moules complexes pour éléments de construction.', 
      tags: ['Conception Moule', 'BN4'], 
      icon: 'Settings', 
      image: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&w=800&q=80',
      order: 3 
    },
  ]);
  console.log('✅ Projects seeded');

  // Experience with details (bullet points)
  await Experience.insertMany([
    { 
      year: 'janvier 2025 - présent', 
      title: 'Responsable Suivi et Co-responsable Logistique', 
      company: 'SECOMET', 
      desc: 'Gestion globale de la production et de la conformité technique.',
      details: [
        'Suivi et gestion des ordres de fabrication, contrôle des matières premières.',
        'Élaboration et optimisation des méthodes de fabrication.',
        'Supervision du processus de fabrication et respect des délais.',
        'Gestion de la qualité et traitement des non-conformités.'
      ],
      current: true, featured: true, order: 0 
    },
    { 
      year: 'février-novembre 2024', 
      title: 'Stage PFE - Amélioration Machine', 
      company: 'SPARCO', 
      desc: 'Projet de fin d\'études sur l\'optimisation de l\'injection résine.',
      details: [
        'Amélioration et conception d\'une machine d\'injection de résine d\'un siège auto.',
        'Calculs RDM et programmation sur automate.'
      ],
      featured: true, order: 1 
    },
    { 
      year: 'Juin 2023', 
      title: 'Stagiaire - Conception Mécanique', 
      company: 'LPE', 
      desc: 'Immersion technique dans la CAO et la simulation RDM/FEM.',
      details: [
        'Analyse des cahiers des charges et spécifications techniques.',
        'Conception de pièces et ensembles complexes (SolidWorks, CATIA, Inventor).',
        'Réalisation des plans de fabrication avec cotation/tolérances.',
        'Simulations RDM et analyses par éléments finis (FEM).'
      ],
      featured: true, order: 2 
    },
    { 
      year: 'Aout 2023', 
      title: 'Stagiaire - Production', 
      company: 'TUNICOTEX', 
      desc: 'Amélioration des procédés de production textile.',
      details: [
        'Compréhension des étapes textile (filature, tissage, finition).',
        'Assistance au contrôle des équipements de production.',
        'Optimisation des procédés pour réduire les pertes.'
      ],
      featured: false, order: 3 
    },
    { 
      year: 'Aout 2022', 
      title: 'Stagiaire - Fabrication CNC', 
      company: 'CORAIL TECHNOLOGIE', 
      desc: 'Expertise pratique sur machines à commande numérique.',
      details: [
        'Compréhension du fonctionnement des machines CNC.',
        'Réglage et configuration des machines selon plans techniques.',
        'Contrôle métrologique de précision (pied à coulisse, micromètre).'
      ],
      featured: false, order: 4 
    },
  ]);
  console.log('✅ Experience seeded');

  // Training (JCI History)
  await Training.create({
    bio: 'Formateur de compétences générales depuis mars 2023. Mon parcours JCI témoigne d\'un engagement constant vers l\'excellence et le leadership.',
    featuredWorkshop: 'Formateur Confirmé - Convention Nationale 2023',
    featuredWorkshopImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    topics: ['Prise de parole en public', 'Gestion de conflits', 'Négociation', 'Leadership', 'Préparation de projets'],
    stats: [
      { label: 'Formations Animées', value: '+50', icon: 'BookOpen', order: 0 },
      { label: 'En Présentiel', value: '90%', icon: 'Users', order: 1 },
      { label: 'Membres Impactés', value: '200+', icon: 'Award', order: 2 },
    ],
    roles: [
      { year: '2026', title: 'C.J & Conseiller Zonal HDD', sub: 'OLM Fondouk Djedid / Zone A', desc: 'Orientation et développement des membres au niveau zonal.', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&q=80', order: 0 },
      { year: '2025', title: 'P.P.I', sub: 'OLM Fondouk Djedid', desc: 'Past President Immediate - Accompagnement de la nouvelle équipe.', order: 1 },
      { year: '2024', title: 'Président Fondateur', sub: 'OLM Fondouk Djedid', desc: 'Création et vision stratégique de la nouvelle organisation locale.', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80', order: 2 },
      { year: '2023', title: 'VPPRE', sub: 'OLM Grombalia', desc: 'Vice-Président Programme et Relations Extérieures.', order: 3 },
      { year: '2022', title: 'VPFD', sub: 'OLM Grombalia', desc: 'Vice-Président Formation et Développement. Meilleur membre plus remarquable Zone A.', order: 4 },
      { year: '2021', title: 'C.J', sub: 'OLM Grombalia', desc: 'Conseiller Juridique - Engagement communautaire et conformité.', order: 5 },
    ],
    sessions: [
      { title: 'Formation Leadership & Communication', date: 'Mars 2023', desc: 'Session interactive sur les fondements du leadership JCI.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80', order: 0 },
      { title: 'Workshop Design Thinking', date: 'Juin 2024', desc: 'Animation d\'un atelier de co-création pour jeunes porteurs de projets.', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80', order: 1 },
    ],
  });
  console.log('✅ Training seeded');

  // Education
  await Education.create({
    degrees: [
      { title: 'Cycle d’Ingénieurs - Génie Mécanique', org: 'ENSIT', note: 'Ecole Nationale Supérieure d’Ingénieurs de Tunis (2021 - 2024)', current: true, order: 0 },
      { title: 'Cycle Préparatoire (PT)', org: 'IPEIN', note: 'Institut Préparatoire aux Etudes d’Ingénieurs de Nabeul (2019 - 2021)', order: 1 },
      { title: 'Baccalauréat', org: 'Lycée Grombalia', note: 'Obtenu en 2019', order: 2 },
    ],
    certs: [
      { title: 'CSWA / CSWP Solidworks 2025', org: 'Dassault Systèmes', order: 0 },
      { title: 'Responsable Qualité', org: 'Certification (08/2023)', order: 1 },
      { title: 'Industrie 4.0', org: 'Technique (07/2023)', order: 2 },
      { title: 'ISO 9001', org: 'Management (10/2022)', order: 3 },
      { title: 'Bureau Microsoft Office', org: 'Productivité (04/2023)', order: 4 },
    ],
    languages: ['Français', 'Anglais', 'Espagnol'],
    interests: ['Taekwondo', 'Football', 'Handball', 'Lecture', 'Interaction', 'Voyage']
  });
  console.log('✅ Education seeded');

  // Quote
  await Quote.create({
    text1: 'Mon expérience de formateur renforce ma capacité à communiquer des idées techniques, ',
    highlight: 'diriger des équipes',
    text2: ', et gérer efficacement des projets.'
  });
  console.log('✅ Quote seeded');

  // Contact Info
  await ContactInfo.create({
    email: 'mohamedchakroun.ing@gmail.com',
    phone: '+216 55 123 875',
    location: 'Tunisie / À distance',
    linkedin: 'https://www.linkedin.com/in/mohamed-chakrounchak/',
    instagram: 'https://www.instagram.com/mohamed_chakroun05/',
    facebook: 'https://www.facebook.com/mohamed.chakroun.2005'
  });
  console.log('✅ Contact Info seeded');

  console.log('\n🎉 Rich data restored with images and details!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
