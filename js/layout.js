// Shared header and footer for the training library.
// It matches the Midnight design used by the home page and the pages in /pages/.
const isRoot = !/\/(pages|training|tour)\//.test(window.location.pathname);
const base = isRoot ? '' : '../';
const MN_STYLE = `
<style>
.mn-bar{background:#12264A;color:#F4F6FB;text-align:center;padding:10px 24px;font:600 15px 'Inter',system-ui,sans-serif}
.mn-dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#E8BD4A;margin-right:10px}
#nav-placeholder{display:contents}
html{scroll-padding-top:calc(var(--head-height,min(200px,40vh)) + env(safe-area-inset-top,0px) + 16px)}
.mn-head{position:sticky;top:env(safe-area-inset-top,0px);z-index:20;max-height:40vh;max-height:40svh;overflow-y:auto;background:#0A1730;padding:14px 24px;border-bottom:1px solid rgba(255,255,255,0.14);font-family:'Inter',system-ui,sans-serif}
.mn-in{max-width:1360px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 24px}
.mn-brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:#F4F6FB;font-weight:700;font-size:20px;line-height:1.15}
.mn-brand img{height:52px;width:auto;max-width:none}
.mn-brand small{display:block;font-size:13px;font-weight:500;color:#B8C4DA}
.mn-menu{display:flex;flex-wrap:wrap;align-items:center;gap:4px 20px}
.mn-menu a.mn-l{color:#F4F6FB;text-decoration:none;font-size:15px;font-weight:500;padding:12px 2px;white-space:nowrap}
.mn-btn{display:inline-flex;align-items:center;min-height:52px;padding:0 26px;border-radius:12px;font-weight:700;font-size:16px;text-decoration:none;background:#E8BD4A;color:#0A1730}
.mn-foot{background:#0A1730;color:#B8C4DA;padding:32px 24px;border-top:1px solid rgba(255,255,255,0.14);font:15px 'Inter',system-ui,sans-serif}
.mn-foot .mn-in{max-width:1160px}
.mn-foot a{color:#F4F6FB;text-decoration:none;padding:12px 0}
.mn-foot nav{display:flex;flex-wrap:wrap;gap:4px 22px}
.mn-foot .mn-b{display:flex;align-items:center;gap:12px}
.mn-foot .mn-b img{height:40px;width:auto;max-width:none}
</style>`;
const NAV = `
<div class="mn-bar"><span class="mn-dot"></span>PCS is now available for companies that operate entirely in the cloud.</div>
<header class="mn-head"><div class="mn-in">
  <a class="mn-brand" href="${base}index.html"><img src="${base}images/home/owl.png" alt="Pistos owl logo"><span>Pistos<small>Information Protection</small></span></a>
  <nav class="mn-menu" aria-label="Main">
    <a class="mn-l" href="${base}pages/pcs.html">Compliance Sentinel</a>
    <a class="mn-l" href="${base}pages/skopein.html">Skopein</a>
    <a class="mn-l" href="${base}index.html#who">Who PCS serves</a>
    <a class="mn-l" href="${base}pages/insights.html">Published work</a>
    <a class="mn-l" href="${base}pages/pricing.html">Pricing</a>
    <a class="mn-l" href="https://app.pistosip.com">Client sign-in</a>
    <a class="mn-btn" href="https://demo.pistosip.com/try">Start your free 14-day test drive</a>
  </nav>
</div></header>`;
const FOOTER = `
<footer class="mn-foot"><div class="mn-in">
  <div class="mn-b"><img src="${base}images/home/owl.png" alt=""><span>Pistos Information Protection</span></div>
  <a href="tel:+18002915058" style="font-weight:600">Call (800) 291-5058</a>
  <nav aria-label="Footer">
    <a href="${base}pages/about.html">About Pistos</a>
    <a href="${base}pages/pricing.html">Pricing</a>
    <a href="${base}pages/contact.html">Contact</a>
    <a href="${base}pages/privacy.html">Privacy</a>
    <a href="${base}pages/terms.html">Terms of use</a>
  </nav>
  <span>Copyright 2026 Pistos Information Protection LLC. All rights reserved.</span>
</div></footer>`;
const navSlot = document.getElementById('nav-placeholder');
if (navSlot) navSlot.innerHTML = MN_STYLE + NAV;
const footSlot = document.getElementById('footer-placeholder');
if (footSlot) footSlot.innerHTML = FOOTER;
