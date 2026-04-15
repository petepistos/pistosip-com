const isRoot = !window.location.pathname.includes('/pages/');
const base = isRoot ? '' : '../';
const NAV = `
<nav class="nav">
  <div class="nav-inner">
    <a href="${base}index.html" class="nav-logo"><span class="pi">&#960;&#953;&#963;&#964;&#972;&#962;</span>&nbsp;&nbsp;Pistos</a>
    <div class="nav-links">
      <span class="nav-group-label">Products</span>
      <a href="${base}pages/skopein.html">Skopein</a>
      <a href="${base}pages/sentinel.html">Sentinel</a>
      <a href="${base}pages/mathisi.html">Mathisi</a>
      <a href="${base}pages/aegis.html">Aegis</a>
      <span class="nav-divider"></span>
      <span class="nav-group-label">Industries</span>
      <a href="${base}pages/financial-services.html">Financial Services</a>
      <a href="${base}pages/healthcare.html">Healthcare</a>
      <a href="${base}pages/defense.html">Defense</a>
      <span class="nav-divider"></span>
      <a href="${base}pages/about.html">About</a>
      <a href="${base}pages/insights.html">Insights</a>
      <a href="${base}pages/contact.html">Contact</a>
      <a href="${base}pages/coming-soon.html" class="nav-portal">Access your portal</a>
    </div>
    <div class="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>`;
const FOOTER = `
<footer class="footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <span class="serif" style="font-size:1.1rem;color:#F5F1EB;letter-spacing:0.08em;">&#960;&#953;&#963;&#964;&#972;&#962;&nbsp;&nbsp;Pistos</span>
      <p>Cybersecurity compliance programs for organizations under 500 employees. Designed by former partners from Accenture, EY, PwC, and Wipro. Built for financial services, healthcare, and defense.</p>
    </div>
    <div class="footer-col">
      <h4>Products</h4>
      <a href="${base}pages/skopein.html">Skopein</a>
      <a href="${base}pages/sentinel.html">Sentinel</a>
      <a href="${base}pages/mathisi.html">Mathisi</a>
      <a href="${base}pages/aegis.html">Aegis</a>
    </div>
    <div class="footer-col">
      <h4>Industries</h4>
      <a href="${base}pages/financial-services.html">Financial Services</a>
      <a href="${base}pages/healthcare.html">Healthcare</a>
      <a href="${base}pages/defense.html">Defense &amp; Government</a>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <a href="${base}pages/about.html">About Pistos</a>
      <a href="${base}pages/contact.html">Contact</a>
      <a href="${base}pages/coming-soon.html">Client Portal</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 Pistos Information Protection LLC</p>
    <p class="footer-tagline">Faithful in discipline. Steadfast in execution. Accountable in outcome.</p>
  </div>
</footer>`;
document.getElementById('nav-placeholder').innerHTML = NAV;
document.getElementById('footer-placeholder').innerHTML = FOOTER;
