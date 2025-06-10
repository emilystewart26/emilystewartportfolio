// Hamburger Menu
function toggleMenu() {
  const menu = document.getElementById("hamburger-menu");
  menu.classList.toggle("hidden");
}

// Slider
const slider = document.getElementById("card-slider");

slider.addEventListener("mouseenter", () => {
  slider.classList.add("paused");
});

slider.addEventListener("mouseleave", () => {
  slider.classList.remove("paused");
});

const cards = slider.querySelectorAll(".card, .flex-shrink-0");

cards.forEach((card) => {
  const clone = card.cloneNode(true);
  slider.appendChild(clone);
});

// Get all heading and subheading elements
const aboutSubheading = document.getElementById('about-subheading');
const aboutHeading = document.getElementById('about-heading');
const skillsSubheading = document.getElementById('skills-subheading');
const skillsHeading = document.getElementById('skills-heading');
const projectsSubheading = document.getElementById('projects-subheading');
const projectsHeading = document.getElementById('projects-heading');

// Create arrays for easier management
const allSubheadings = [aboutSubheading, skillsSubheading, projectsSubheading];
const allHeadings = [aboutHeading, skillsHeading, projectsHeading];
const allElements = [...allSubheadings, ...allHeadings];

// Intersection Observer for fade-in
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-4');
      } else {
        entry.target.classList.add('opacity-0', 'translate-y-4');
      }
    });
  },
  { threshold: 0.1 } // Lowered threshold for better visibility
);

// Observe all elements
allElements.forEach(el => {
  if (el) observer.observe(el);
});

// Parallax + Fade-out effects on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Apply effects to all subheadings (fade out + parallax)
  allSubheadings.forEach(subheading => {
    if (subheading) {
      // Get the section's position relative to viewport
      const rect = subheading.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      
      // Calculate scroll distance relative to when element comes into view
      const relativeScroll = Math.max(0, scrollY - elementTop + window.innerHeight);
      const offset = relativeScroll * 0.2;

      // Only apply effects when element is in or near viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        subheading.style.transform = `translateY(${-offset}px)`;

        // Fade out based on relative scroll position
        const fadeOutStart = 250;
        const fadeOutEnd = 450;
        const opacity = 1 - Math.min(Math.max((relativeScroll - fadeOutStart) / (fadeOutEnd - fadeOutStart), 0), 1);
        subheading.style.opacity = opacity.toString();
      }
    }
  });

  // Apply parallax effects to all headings (no fade out)
  allHeadings.forEach(heading => {
    if (heading) {
      // Get the section's position relative to viewport
      const rect = heading.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      
      // Calculate scroll distance relative to when element comes into view
      const relativeScroll = Math.max(0, scrollY - elementTop + window.innerHeight);
      const offset = relativeScroll * 0.2;

      // Only apply effects when element is in or near viewport
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Set maximum distance the heading can move (in pixels)
        const maxDistance = 100;
        const limitedOffset = Math.min(offset * 1.5, maxDistance);
        
        heading.style.transform = `translateY(${-limitedOffset}px)`;
      }
    }
  });
});

