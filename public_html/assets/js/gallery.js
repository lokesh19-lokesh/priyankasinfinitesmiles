/**
 * PRIYANKA'S INFINITE SMILES - SMILE GALLERY JAVASCRIPT
 * Interactive Category Filtering, Draggable Before/After Comparison, Case Study Modal
 * Inspired by premium cosmetic dentistry showcases
 */

// CLINICAL CASE DATABASE
const GALLERY_CASES = [
  {
    id: "case-01",
    category: "smile-designing",
    categoryLabel: "Smile Designing",
    title: "Complete Digital Smile Makeover with Porcelain Veneers",
    shortDesc: "Corrected worn incisal edges, midline shift, and intrinsic fluorosis staining using 8 ultra-thin ceramic veneers.",
    beforeImg: "../assets/images/gallery/smile-design-before.jpg",
    afterImg: "../assets/images/gallery/smile-design-after.jpg",
    duration: "2 Visits (10 Days)",
    objective: "Restore aesthetic smile arc, fix tooth discoloration, and correct mild crowding without invasive cutting.",
    stages: [
      "Digital Smile Design (DSD) photography & 3D aesthetic simulation",
      "Conservative minimal enamel preparation & temporary mockup trial",
      "Custom hand-layered ceramic veneers fabrication",
      "Precision adhesive bonding under dental dam isolation & bite balancing"
    ],
    doctor: "Dr. Priyanka Vijayakumar (MDS, Fellowship in Cosmetic Dentistry)",
    result: "Natural, luminous smile with harmonious lip line symmetry and preserved enamel integrity."
  },
  {
    id: "case-02",
    category: "dental-implants",
    categoryLabel: "Dental Implants",
    title: "Immediate Single Anterior Dental Implant with Zirconia Crown",
    shortDesc: "Replaced a fractured front tooth with a guided bio-compatible titanium implant and custom ceramic crown.",
    beforeImg: "../assets/images/gallery/implant-before.jpg",
    afterImg: "../assets/images/gallery/implant-after.jpg",
    duration: "Guided Surgery + Final Crown",
    objective: "Restore missing front tooth with full chewing function and pink aesthetic gum symmetry.",
    stages: [
      "CBCT 3D bone volume mapping & virtual implant planning",
      "Painless minimally invasive computer-guided implant placement",
      "Osseointegration monitoring & custom healing abutment shaping",
      "Precision CAD/CAM screw-retained Zirconia crown delivery"
    ],
    doctor: "Dr. Priyanka Vijayakumar & Specialist Implantologist",
    result: "Indistinguishable from natural adjacent teeth with stable bone density."
  },
  {
    id: "case-03",
    category: "teeth-whitening",
    categoryLabel: "Teeth Whitening",
    title: "In-Office Laser Teeth Whitening for Stubborn Food Stains",
    shortDesc: "Brightened yellowish dentin by 7 shades in a single safe 45-minute chairside laser session.",
    beforeImg: "../assets/images/gallery/whitening-before.jpg",
    afterImg: "../assets/images/gallery/whitening-after.jpg",
    duration: "Single Session (45 Minutes)",
    objective: "Eliminate deep tea, coffee, and age-related yellowing safely without tooth sensitivity.",
    stages: [
      "Oral prophylaxis & ultrasonic scaling to remove surface plaque",
      "Application of protective gingival barrier for gum safety",
      "Application of pH-neutral hydrogen peroxide whitening gel",
      "Cold-light laser activation cycles followed by remineralizing desensitizing polish"
    ],
    doctor: "Dr. Priyanka Vijayakumar",
    result: "Sparkling natural white smile with zero enamel damage and minimal post-op sensitivity."
  },
  {
    id: "case-04",
    category: "root-canal-treatment",
    categoryLabel: "Root Canal Treatment",
    title: "Single-Sitting Rotary Root Canal & Monolithic Zirconia Crown",
    shortDesc: "Saved a severely decayed molar causing acute night pain with precision rotary apex locator endodontics.",
    beforeImg: "../assets/images/gallery/rct-before.jpg",
    afterImg: "../assets/images/gallery/rct-after.jpg",
    duration: "Single Visit (60 Minutes)",
    objective: "Eradicate deep pulpal infection painlessly and reinforce tooth structure with a lifelike crown.",
    stages: [
      "Digital RVG X-ray & electronic apex locator canal measurement",
      "Painless local anesthesia & complete rubber dam isolation",
      "Automated NiTi rotary biomechanical canal shaping & warm gutta-percha obturation",
      "Fiber post core buildup and laser-scanned metal-free Zirconia crown cementation"
    ],
    doctor: "Dr. Priyanka Vijayakumar (Endodontic Team)",
    result: "Instant pain relief, preserved natural tooth root, and 100% restored biting pressure."
  },
  {
    id: "case-05",
    category: "braces-aligners",
    categoryLabel: "Braces & Aligners",
    title: "Clear Invisible Aligners for Severe Crowding & Crossbite",
    shortDesc: "Straightened overlapping upper and lower front teeth over 9 months without metal brackets or wires.",
    beforeImg: "../assets/images/gallery/aligners-before.jpg",
    afterImg: "../assets/images/gallery/aligners-after.jpg",
    duration: "9 Months (Bi-weekly Trays)",
    objective: "Correct dental crowding, align dental arches, and optimize patient bite function discreetly.",
    stages: [
      "3D Intraoral digital scan and 3D computerized movement simulation",
      "Delivery of custom medical-grade thermoplastic aligner series",
      "Bi-monthly progress monitoring and refinement checks",
      "Placement of invisible post-treatment lingual retention wire"
    ],
    doctor: "Orthodontic & Aligners Specialist",
    result: "Perfect arch alignment, easier flossing, and significant boost in facial self-confidence."
  },
  {
    id: "case-06",
    category: "dental-crowns",
    categoryLabel: "Dental Crowns",
    title: "Full Arch Monolithic Zirconia Bridges for Severe Wear",
    shortDesc: "Restored collapsed vertical bite dimension and broken enamel with translucent multi-layered Zirconia.",
    beforeImg: "../assets/images/gallery/crowns-before.jpg",
    afterImg: "../assets/images/gallery/crowns-after.jpg",
    duration: "2 Weeks",
    objective: "Rebuild chewing function, prevent jaw muscle fatigue, and create youthful tooth contours.",
    stages: [
      "Facebow bite recording and diagnostic diagnostic wax-up",
      "Conservative crown preparation and provisional protective splint",
      "CAD/CAM milling of high-translucency Zirconia crowns",
      "Resin-modified glass ionomer cementation with canine-guided occlusion"
    ],
    doctor: "Dr. Priyanka Vijayakumar",
    result: "Comfortable balanced occlusion, high fracture resistance, and radiant youthful smile."
  },
  {
    id: "case-07",
    category: "veneers",
    categoryLabel: "Veneers",
    title: "Diastema Closure & Micro-Aesthetic Ceramic Veneers",
    shortDesc: "Closed prominent spacing between central incisors (gap) with ultra-conservative lithium disilicate veneers.",
    beforeImg: "../assets/images/gallery/veneers-before.jpg",
    afterImg: "../assets/images/gallery/veneers-after.jpg",
    duration: "2 Visits",
    objective: "Close midline gap seamlessly without braces, matching natural adjacent tooth shade.",
    stages: [
      "Aesthetic proportion analysis and direct composite trial simulation",
      "Prepless ceramic veneer fabrication tailored to natural tooth translucency",
      "Try-in paste shade verification under natural daylight spectrum",
      "Silane coupling and dual-cure resin bonding"
    ],
    doctor: "Dr. Priyanka Vijayakumar",
    result: "Flawless gap closure with zero black triangles and high patient delight."
  },
  {
    id: "case-08",
    category: "cosmetic-dentistry",
    categoryLabel: "Cosmetic Dentistry",
    title: "Composite Edge Bonding for Chipped Front Teeth",
    shortDesc: "Same-day cosmetic composite bonding restoring fractured enamel after sports trauma.",
    beforeImg: "../assets/images/gallery/composite-before.jpg",
    afterImg: "../assets/images/gallery/composite-after.jpg",
    duration: "Single Visit (40 Minutes)",
    objective: "Repair jagged fractures seamlessly using multi-shade nano-hybrid aesthetic resin.",
    stages: [
      "Tooth shade mapping using enamel & dentin opacities",
      "Micro-beveling of enamel borders for invisible margin blend",
      "Multi-layer incremental composite sculpting",
      "Multi-grit diamond polishing for high-gloss enamel shine"
    ],
    doctor: "Dr. Priyanka Vijayakumar",
    result: "Immediate restoration of natural tooth form and smooth tongue feel in under an hour."
  },
  {
    id: "case-09",
    category: "laser-dentistry",
    categoryLabel: "Laser Dentistry",
    title: "Laser Gingival Recontouring for Gummy Smile Correction",
    shortDesc: "Painless diode laser gum sculpting lengthening short clinical crowns for a balanced aesthetic smile line.",
    beforeImg: "../assets/images/gallery/laser-before.jpg",
    afterImg: "../assets/images/gallery/laser-after.jpg",
    duration: "Single Visit (30 Minutes)",
    objective: "Reduce excessive gingival display and expose natural hidden enamel contours painlessly.",
    stages: [
      "Aesthetic biological width measurement and digital smile mapping",
      "Painless topical spray and micro-anesthesia application",
      "Soft tissue diode laser gum contouring with zero scalpel and zero bleeding",
      "Coagulation and rapid epithelial healing regimen"
    ],
    doctor: "Dr. Priyanka Vijayakumar",
    result: "Symmetrical gum scalloping, elongated teeth, and accelerated 48-hour healing."
  },
  {
    id: "case-10",
    category: "bridges",
    categoryLabel: "Bridges",
    title: "Fixed Zirconia Dental Bridge for Missing Premolar",
    shortDesc: "Restored a missing premolar tooth without surgery, providing instant fixed chewing strength.",
    beforeImg: "../assets/images/gallery/bridge-before.jpg",
    afterImg: "../assets/images/gallery/bridge-after.jpg",
    duration: "5 Days",
    objective: "Fill space left by extracted tooth to prevent adjacent teeth from tilting and drifting.",
    stages: [
      "Digital shade matching and conservative abutment preparation",
      "Digital intraoral scan sent to CAD/CAM dental laboratory",
      "Precision metal-free Zirconia bridge framework milling",
      "Permanent hygienic cementation with flossing clearance"
    ],
    doctor: "Dr. Priyanka Vijayakumar",
    result: "Rock-solid biting strength and seamless blend with existing dentition."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryCards = document.querySelectorAll(".gallery-card");
  const caseModalElement = document.getElementById("caseStudyModal");
  let bsCaseModal = null;
  if (caseModalElement && typeof bootstrap !== "undefined") {
    bsCaseModal = new bootstrap.Modal(caseModalElement);
  }

  // 1. FILTERING LOGIC
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedFilter = btn.getAttribute("data-filter");

      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      let visibleCount = 0;
      galleryCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (selectedFilter === "all" || cardCategory === selectedFilter) {
          card.style.display = "flex";
          card.classList.remove("fade-in");
          void card.offsetWidth; // Trigger reflow for animation restart
          card.classList.add("fade-in");
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      // Handle empty state message if needed
      const emptyState = document.getElementById("galleryEmptyState");
      if (emptyState) {
        emptyState.style.display = visibleCount === 0 ? "block" : "none";
      }
    });
  });

  // 2. INTERACTIVE BEFORE/AFTER SLIDER LOGIC
  const initSlider = (container) => {
    if (container.dataset.baGalleryInit) return;
    container.dataset.baGalleryInit = "true";

    const range = container.querySelector(".ba-range-slider");
    const afterWrap = container.querySelector(".ba-after-wrap");
    const handle = container.querySelector(".ba-handle");
    const afterImg = afterWrap ? afterWrap.querySelector("img") : null;
    const beforeBadge = container.querySelector(".badge-before");
    const afterBadge = container.querySelector(".badge-after");

    if (!afterWrap || !handle) return;

    const syncImgWidth = () => {
      if (afterImg && container.offsetWidth > 0) {
        afterImg.style.width = `${container.offsetWidth}px`;
        afterImg.style.maxWidth = "none";
      }
    };

    syncImgWidth();
    window.addEventListener("resize", syncImgWidth, { passive: true });

    const updateSlider = (value) => {
      value = Math.max(0, Math.min(100, value));
      afterWrap.style.width = `${value}%`;
      handle.style.left = `${value}%`;
      if (range) range.value = value;
      syncImgWidth();
    };

    let animId = null;
    const animateTo = (targetPercent, duration = 300) => {
      if (animId) cancelAnimationFrame(animId);
      const currentVal = parseFloat(range ? range.value : (afterWrap.style.width || "50"));
      const startTime = performance.now();
      const startVal = isNaN(currentVal) ? 50 : currentVal;
      const diff = targetPercent - startVal;

      if (Math.abs(diff) < 0.5) {
        updateSlider(targetPercent);
        return;
      }

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progress, 3);
        updateSlider(startVal + (diff * ease));
        if (progress < 1) {
          animId = requestAnimationFrame(step);
        } else {
          animId = null;
        }
      };
      animId = requestAnimationFrame(step);
    };

    if (range) {
      range.addEventListener("input", (e) => {
        if (animId) cancelAnimationFrame(animId);
        updateSlider(parseFloat(e.target.value));
      });
      range.addEventListener("change", (e) => {
        updateSlider(parseFloat(e.target.value));
      });
    }

    if (beforeBadge) {
      beforeBadge.addEventListener("pointerdown", (e) => e.stopPropagation());
      beforeBadge.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        animateTo(0);
      });
    }

    if (afterBadge) {
      afterBadge.addEventListener("pointerdown", (e) => e.stopPropagation());
      afterBadge.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        animateTo(100);
      });
    }

    handle.addEventListener("dblclick", (e) => {
      e.preventDefault();
      e.stopPropagation();
      animateTo(50);
    });
  };

  document.querySelectorAll(".ba-slider-container").forEach(initSlider);

  // 3. CASE STUDY MODAL OPENING
  window.openCaseModal = (caseId) => {
    const caseData = GALLERY_CASES.find(c => c.id === caseId);
    if (!caseData || !caseModalElement) return;

    document.getElementById("modalCaseTitle").textContent = caseData.title;
    document.getElementById("modalCaseBadge").textContent = caseData.categoryLabel;
    document.getElementById("modalCaseDuration").textContent = caseData.duration;
    document.getElementById("modalCaseObjective").textContent = caseData.objective;
    document.getElementById("modalCaseDoctor").textContent = caseData.doctor;
    document.getElementById("modalCaseResult").textContent = caseData.result;

    // Render stages list
    const stagesList = document.getElementById("modalCaseStages");
    if (stagesList) {
      stagesList.innerHTML = "";
      caseData.stages.forEach(stage => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${stage}`;
        stagesList.appendChild(li);
      });
    }

    // Update images in modal slider with path resolution
    const modalBeforeImg = document.getElementById("modalBeforeImg");
    const modalAfterImg = document.getElementById("modalAfterImg");
    let bImg = caseData.beforeImg;
    let aImg = caseData.afterImg;
    if (!window.location.pathname.includes("/smile-gallery/")) {
      bImg = bImg.replace(/^\.\.\//, "");
      aImg = aImg.replace(/^\.\.\//, "");
    }
    if (modalBeforeImg) modalBeforeImg.src = bImg;
    if (modalAfterImg) modalAfterImg.src = aImg;

    // Reset modal slider to 50%
    const modalSliderRange = caseModalElement.querySelector(".ba-range-slider");
    const modalAfterWrap = caseModalElement.querySelector(".ba-after-wrap");
    const modalHandle = caseModalElement.querySelector(".ba-handle");
    if (modalSliderRange && modalAfterWrap && modalHandle) {
      modalSliderRange.value = 50;
      modalAfterWrap.style.width = "50%";
      modalHandle.style.left = "50%";
    }

    if (bsCaseModal) {
      bsCaseModal.show();
      setTimeout(() => {
        const modalContainer = caseModalElement.querySelector(".ba-slider-container");
        if (modalContainer && modalAfterImg) {
          modalAfterImg.style.width = `${modalContainer.offsetWidth}px`;
          modalAfterImg.style.maxWidth = "none";
        }
      }, 200);
    }
  };

  // Attach click listener to case study trigger buttons
  document.querySelectorAll("[data-case-id]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const caseId = btn.getAttribute("data-case-id");
      window.openCaseModal(caseId);
    });
  });

  // 4. Initialize GLightbox if loaded
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      zoomable: true
    });
  }
});

