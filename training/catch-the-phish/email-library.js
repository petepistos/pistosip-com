/*
 * Catch the Phish reusable message library
 * 30 packs x 4 complete messages = 120 unique email samples.
 * Every pack contains exactly one phishing message and three legitimate decoys.
 * All external domains use the reserved .example suffix.
 */

const CTP_INTERNAL_BRAND = Object.freeze({
  name: "Pistosip",
  domain: "pistosip.com"
});

const CTP_BRANDS = [
  ["Northstar Office", "northstaroffice.example"],
  ["Vector Cloud", "vectorcloud.example"],
  ["Apex Supplies", "apexsupplies.example"],
  ["Harbor Bank", "harborbank.example"],
  ["Harrington Legal", "harringtonlegal.example"],
  ["DocuFlow", "docuflow.example"],
  ["SignCore", "signcore.example"],
  ["BrightPay", "brightpay.example"],
  ["FleetLine Logistics", "fleetline.example"],
  ["RedRiver Health", "redriverhealth.example"],
  ["Summit Insurance", "summitinsurance.example"],
  ["Orbit Travel", "orbittravel.example"],
  ["BluePeak Telecom", "bluepeaktelecom.example"],
  ["Cedar HR", "cedarhr.example"],
  ["Meridian Analytics", "meridiananalytics.example"],
  ["Oakstone Facilities", "oakstonefacilities.example"],
  ["NovaWorks", "novaworks.example"],
  ["Alpine Data", "alpinedata.example"],
  ["Beacon Energy", "beaconenergy.example"],
  ["Sterling Audit", "sterlingaudit.example"],
  ["Copperline Consulting", "copperline.example"],
  ["Meadow Benefits", "meadowbenefits.example"],
  ["Skyline Hosting", "skylinehosting.example"],
  ["Vertex Security", "vertexsecurity.example"],
  ["Tidewater Shipping", "tidewatershipping.example"],
  ["Lumen Print", "lumenprint.example"],
  ["Pinecrest Capital", "pinecrestcapital.example"],
  ["Horizon Events", "horizonevents.example"],
  ["IronGate Storage", "irongatestorage.example"],
  ["Riverbend Payroll", "riverbendpayroll.example"]
].map(([name, domain]) => ({ name, domain }));

const CTP_PEOPLE = [
  "Maya Chen", "Dana Reid", "Nina Hart", "Marco Ruiz", "Lena Ortiz",
  "Emily Grant", "Alex Romero", "Priya Shah", "Jordan Blake", "Marcus Lee",
  "Elena Park", "Noah Bennett", "Sofia Alvarez", "Ethan Cole", "Avery Brooks",
  "Camila Torres", "Daniel Kim", "Leah Morgan", "Isaac Reed", "Natalie Price",
  "Owen Patel", "Chloe Sanders", "Julian Foster", "Amelia Ross", "Caleb Young",
  "Zoe Mitchell", "Adrian Clarke", "Grace Turner", "Miles Hughes", "Riley Cooper"
];

const CTP_PROJECTS = [
  "Atlas", "Northstar Renewal", "Project Lighthouse", "Orion Migration",
  "Beacon Expansion", "Horizon Review", "Phoenix Recovery", "Cedar Integration",
  "Summit Modernization", "Vector Capacity Plan"
];

const CTP_CITIES = [
  "London", "Chicago", "Toronto", "San Francisco", "Frankfurt",
  "Singapore", "Austin", "Boston", "Dublin", "Seattle"
];

const CTP_WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const CTP_DEADLINES = ["10:00 AM", "noon", "2:30 PM", "4:00 PM", "5:00 PM", "close of business"];
const CTP_DIFFICULTY_NAMES = [
  "Rookie", "Apprentice", "Observer", "Analyst", "Investigator",
  "Threat Hunter", "Senior Analyst", "Lead Investigator", "Principal Analyst",
  "Phish Whisperer"
];

const CTP_LOGO_PALETTES = [
  ["#0B5CAD", "#5ED4FF"], ["#7447D8", "#C4A7FF"],
  ["#007E70", "#78E7CC"], ["#B24B22", "#FFB37A"],
  ["#B32863", "#FF9DC2"], ["#3657B7", "#9CB7FF"],
  ["#796000", "#F7D85A"], ["#315C79", "#9BD4F1"],
  ["#6E3B84", "#D9A5EC"], ["#356C37", "#A7E8A9"]
];

const CTP_DECOYS_BY_DIFFICULTY = [
  ["benefits", "agenda", "shipment"],
  ["invoice", "expense", "legal"],
  ["share", "project", "calendar"],
  ["forecast", "hr", "meeting"],
  ["security", "vault", "billing"],
  ["capacity", "procurement", "grc"],
  ["appapproval", "teams", "newsletter"],
  ["payroll", "bankalert", "tabletop"],
  ["legalquestions", "dealtracker", "signature"],
  ["vendorir", "evidence", "status"]
];

const CTP_PHISH_SPECS = [
  [
    {
      title: "Mailbox Panic",
      brief: "An obvious threat, poor grammar, and a fake internal login domain.",
      internal: true,
      sender: "Pistosip Mail Support",
      local: "mailbox-security",
      subject: "URGENT: Your mailbox will be disable today",
      body: [
        "Dear user,",
        "Your mailbox are reaching limit and will be disable at {{deadline}}.",
        "Kindly verify immediatly to prevent losing all email and contacts.",
        "Use below secure button now."
      ],
      cta: "KEEP MY MAILBOX",
      link: "https://{{linkDomain}}/mail/verify/{{id}}",
      clues: ["Poor grammar and spelling", "Generic greeting", "Threat of immediate account loss", "Lookalike Pistosip domain"]
    },
    {
      title: "Delivery Trouble",
      brief: "A fake delivery fee hides behind an imitation logistics brand.",
      sender: "{{brand}} Delivery Team",
      local: "delivery-notice",
      subject: "We was unable to deliver your pacakge",
      body: [
        "Hello customer,",
        "We was unable deliver order {{orderId}} because address is incomplete.",
        "A small re-delivery fee of $2.95 is required.",
        "Update details before the parcel is return."
      ],
      cta: "RESCHEDULE DELIVERY",
      link: "https://{{linkDomain}}/delivery/{{orderId}}",
      clues: ["Spelling and grammar errors", "Unexpected small payment request", "Lookalike delivery domain", "Pressure to act before a return"]
    },
    {
      title: "Password Expiration",
      brief: "A fake password warning directs the user away from the real portal.",
      internal: true,
      sender: "Pistosip Account Services",
      local: "password-notice",
      subject: "Your password have expire",
      body: [
        "Hello,",
        "Your company password have expire and access is limited.",
        "Update within 60 minute to avoid account suspension.",
        "Failure to comply will cause email deletion."
      ],
      cta: "UPDATE PASSWORD",
      link: "https://{{linkDomain}}/password/reset/{{id}}",
      clues: ["Poor grammar", "Artificial one-hour deadline", "Threat of email deletion", "Password page is not on pistosip.com"]
    }
  ],

  [
    {
      title: "The Macro Invoice",
      brief: "The sender wants the user to enable active content in a spreadsheet.",
      sender: "{{brand}} Billing",
      local: "billing",
      subject: "Overdue invoice {{invoice}} — action require",
      body: [
        "Our record show invoice {{invoice}} is unpaid.",
        "Open attached sheet and Enable Content for see balance.",
        "Payment must process before {{deadline}}.",
        "Contact us after you send transfer."
      ],
      attachment: "Invoice_{{invoice}}.xlsm",
      clues: ["Macro-enabled spreadsheet", "Requests Enable Content", "Poor grammar", "Unexpected same-day payment demand"]
    },
    {
      title: "The Candidate File",
      brief: "An unexpected archive disguises an executable as a résumé.",
      internal: true,
      sender: "Talent Acquisition",
      local: "recruiting",
      subject: "Executive candidate résumé for review",
      body: [
        "A candidate applied for the open leadership role.",
        "The résumé and portfolio are compressed because of file size.",
        "Extract the archive and open Resume.pdf.exe.",
        "The candidate is waiting for feedback today."
      ],
      attachment: "Candidate_Portfolio.zip",
      clues: ["Double-extension executable", "Unexpected compressed attachment", "Artificial urgency", "Recruiting context may be fabricated"]
    },
    {
      title: "Tax Form Correction",
      brief: "A fake tax notice delivers an HTML credential-harvesting attachment.",
      sender: "{{brand}} Tax Services",
      local: "tax-documents",
      subject: "Your tax document is need correction",
      body: [
        "Dear employee,",
        "Your tax document is need correction before payroll close.",
        "Open attached secure page and sign in with work email.",
        "Please complete today for avoid penalty."
      ],
      attachment: "Tax_Document_Correction.html",
      clues: ["Poor grammar", "HTML attachment", "Requests work-account sign-in", "Threat of an unspecified penalty"]
    }
  ],

  [
    {
      title: "Confidential File Share",
      brief: "A fake cloud-share alert uses a sensitive document as bait.",
      internal: true,
      sender: "Maya Chen via Pistosip Files",
      local: "file-notifications",
      subject: "Maya Chen shared FY26 Compensation Plan",
      body: [
        "Maya Chen shared a restricted compensation document.",
        "Identity verification is required before access.",
        "The document will expire at {{deadline}}.",
        "Sign in using your Pistosip credentials."
      ],
      cta: "OPEN RESTRICTED FILE",
      link: "https://{{linkDomain}}/share/{{id}}",
      clues: ["Unexpected highly sensitive document", "Lookalike file-sharing domain", "Expiration pressure", "Credential request from an email link"]
    },
    {
      title: "Voicemail Transcription",
      brief: "A fake voicemail notification contains conspicuous language mistakes.",
      internal: true,
      sender: "Unified Messaging",
      local: "voicemail",
      subject: "A new voice message was leave for you",
      body: [
        "Hello user,",
        "A new voice message was leave from external caller.",
        "Duration is 01:48 minute.",
        "Sign in to listen the protected recording."
      ],
      cta: "LISTEN VOICEMAIL",
      link: "https://{{linkDomain}}/voicemail/{{id}}",
      clues: ["Poor grammar", "Generic greeting", "Lookalike messaging domain", "Login required to hear an unexpected voicemail"]
    },
    {
      title: "Calendar Update",
      brief: "A fake executive meeting invite directs users to an external sign-in page.",
      internal: true,
      sender: "Executive Calendar",
      local: "calendar-notifications",
      subject: "Updated invitation: Confidential leadership briefing",
      body: [
        "{{manager}} updated a confidential leadership briefing.",
        "The agenda is restricted to invited participants.",
        "Reauthenticate to view the revised meeting details.",
        "The invitation expires after {{deadline}}."
      ],
      cta: "VIEW UPDATED INVITE",
      link: "https://{{linkDomain}}/calendar/{{id}}",
      clues: ["Unexpected confidential meeting", "Reauthentication requested by email", "External destination", "Expiration language"]
    }
  ],

  [
    {
      title: "The Executive Favor",
      brief: "Authority, secrecy, and gift cards replace the need for malware.",
      internal: true,
      fromDomain: "executive-mail.example",
      sender: "{{manager}} — CEO",
      local: "{{managerLocal}}",
      subject: "Need a quick favor before my meeting",
      body: [
        "Pete — I am entering a confidential client meeting.",
        "I need you purchase eight $200 gift cards for leadership.",
        "Keep this private so the recipients are surprised.",
        "Email the card numbers and PINs when finished."
      ],
      clues: ["Executive request from an outside address", "Gift-card purchase", "Request for secrecy", "Bypasses normal purchasing controls"]
    },
    {
      title: "Urgent Wire Transfer",
      brief: "A fake finance request attempts to bypass approval controls.",
      internal: true,
      sender: "{{manager}} — Finance",
      local: "{{managerLocal}}",
      subject: "Confidential wire needed before {{deadline}}",
      body: [
        "Pete, we need to fund the {{project}} transaction today.",
        "Initiate a wire for ${{amount}} using the attached instructions.",
        "Do not contact the vendor because the transaction is confidential.",
        "Send confirmation directly to me."
      ],
      attachment: "Wire_Instructions_{{id}}.pdf",
      clues: ["Unexpected wire request", "Confidentiality used to prevent verification", "Lookalike internal sender domain", "Attempts to bypass established approvals"]
    },
    {
      title: "Vendor Banking Change",
      brief: "A supplier impersonation attack requests new remittance details.",
      sender: "{{person}} | {{brand}}",
      local: "{{personLocal}}",
      subject: "Updated banking information for invoice {{invoice}}",
      body: [
        "Pete, our bank changed following an internal audit.",
        "Use the new ACH instructions for invoice {{invoice}}.",
        "Please update the vendor record before {{deadline}}.",
        "The previous account should no longer be used."
      ],
      attachment: "New_ACH_Instructions.pdf",
      clues: ["Unexpected banking change", "Lookalike vendor domain", "Payment redirection", "Verify with a known phone number"]
    }
  ],

  [
    {
      title: "Impossible Travel",
      brief: "A fake security warning uses fear to capture credentials.",
      internal: true,
      sender: "Pistosip Identity Security",
      local: "identity-alerts",
      subject: "Successful sign-in from {{city}} — review now",
      body: [
        "A successful sign-in to your account was detected.",
        "Location: {{city}}.",
        "Device: {{device}}.",
        "Review the session immediately if you do not recognize it."
      ],
      cta: "REVIEW SIGN-IN",
      link: "https://{{linkDomain}}/identity/session/{{id}}",
      clues: ["Security alert from a lookalike domain", "Button requests another login", "Fear-based call to action", "Destination is not the normal identity portal"]
    },
    {
      title: "MFA Re-enrollment",
      brief: "A fake authentication upgrade attempts to capture a new factor.",
      internal: true,
      sender: "Pistosip Authentication Team",
      local: "mfa-services",
      subject: "Required: Re-enroll MFA before {{deadline}}",
      body: [
        "Your existing MFA registration will be retired.",
        "Re-enroll your authenticator to avoid loss of access.",
        "Scan the code after signing in with your current credentials.",
        "Enrollment must be completed today."
      ],
      cta: "RE-ENROLL MFA",
      link: "https://{{linkDomain}}/mfa/enroll/{{code}}",
      clues: ["Unsolicited MFA reset", "Lookalike identity domain", "Same-day deadline", "Could register an attacker's factor"]
    },
    {
      title: "VPN Certificate",
      brief: "A fake certificate renewal portal targets remote-access credentials.",
      internal: true,
      sender: "Remote Access Operations",
      local: "vpn-certificate",
      subject: "VPN certificate expires on {{date}}",
      body: [
        "Your remote-access certificate is scheduled to expire.",
        "Renew it before {{deadline}} to preserve VPN access.",
        "The process requires your network username and password.",
        "Remote access will stop if renewal is not completed."
      ],
      cta: "RENEW CERTIFICATE",
      link: "https://{{linkDomain}}/vpn/renew/{{ticket}}",
      clues: ["Credential request from an email link", "Lookalike VPN domain", "Threat of losing remote access", "Unexpected renewal workflow"]
    }
  ],

  [
    {
      title: "The Hijacked Invoice Thread",
      brief: "The vendor address may be real, but the payment change is malicious.",
      realDomain: true,
      replyLookalike: true,
      sender: "{{person}} | {{brand}}",
      local: "{{personLocal}}",
      subject: "Re: {{invoice}} — revised remittance instructions",
      body: [
        "Pete, following up on the invoice below.",
        "Our bank changed during the audit.",
        "Use the revised ACH instructions in the attachment.",
        "Please confirm before {{deadline}} to prevent a service hold."
      ],
      attachment: "Revised_Remittance_{{invoice}}.pdf",
      clues: ["Legitimate vendor account may be compromised", "Reply-To differs from From domain", "Unexpected banking change", "Pressure to skip verification"]
    },
    {
      title: "Contract Redline Trap",
      brief: "A realistic legal thread delivers an HTML credential page.",
      sender: "{{person}} | {{brand}}",
      local: "{{personLocal}}",
      subject: "Re: {{project}} services agreement — final redlines",
      body: [
        "Pete, the packet reflects the indemnification edits from our call.",
        "Because the document is restricted, open the secure launcher.",
        "Authenticate with your work account when prompted.",
        "The review window closes on {{date}}."
      ],
      attachment: "{{project}}_Secure_Review.html",
      clues: ["HTML attachment", "Work-account authentication requested", "Subtle lookalike sender domain", "Realistic thread context can be fabricated"]
    },
    {
      title: "Shipment Reroute",
      brief: "A compromised logistics conversation requests an unauthorized reroute.",
      realDomain: true,
      replyLookalike: true,
      sender: "{{person}} | {{brand}}",
      local: "{{personLocal}}",
      subject: "Re: shipment {{orderId}} — delivery location changed",
      body: [
        "The receiving dock rejected shipment {{orderId}}.",
        "Reply with approval to reroute it to the temporary location.",
        "The new address is in the attached form.",
        "Approval is needed before the truck reaches the terminal."
      ],
      attachment: "Reroute_Request_{{orderId}}.docx",
      clues: ["Legitimate account may be compromised", "Reply-To mismatch", "Unexpected destination change", "Time pressure limits independent verification"]
    }
  ],

  [
    {
      title: "The Consent Trap",
      brief: "OAuth consent can steal access without ever requesting a password.",
      sender: "{{brand}} Collaboration",
      local: "app-notifications",
      subject: "{{brand}} needs access to your Microsoft 365 account",
      body: [
        "A document workflow requires additional account access.",
        "Requested: Read mail, contacts, and files.",
        "Requested: Send email as you and maintain offline access.",
        "Approve before the shared session expires."
      ],
      cta: "APPROVE ACCESS",
      linkDomain: "cloud-consent.example",
      replyDomain: "cloud-consent.example",
      link: "https://{{linkDomain}}/oauth/{{code}}",
      clues: ["Unsolicited app-consent request", "Excessive permissions", "Can send email as the user", "Persistent offline access requested"]
    },
    {
      title: "QR Code Enrollment",
      brief: "A QR code conceals the true destination from the user.",
      internal: true,
      sender: "Pistosip Mobile Security",
      local: "mobile-enrollment",
      subject: "Scan required QR code to keep mobile access",
      body: [
        "Mobile-access policy changed for all employees.",
        "Scan the attached QR code with your personal phone.",
        "Sign in and approve the enrollment request.",
        "Access will be removed after {{deadline}}."
      ],
      attachment: "MFA_Enrollment_QR.png",
      clues: ["QR code hides the destination", "Unexpected device enrollment", "Lookalike internal sender domain", "Threat of immediate access removal"]
    },
    {
      title: "Cloud Storage Consent",
      brief: "A fake storage upgrade requests broad access to company data.",
      sender: "{{brand}} Storage",
      local: "storage-upgrade",
      subject: "Storage limit reached — approve archive assistant",
      body: [
        "Your shared storage has reached 98 percent capacity.",
        "Approve Archive Assistant to clean duplicate files.",
        "The application requests access to all company files.",
        "Approval prevents automatic deletion tonight."
      ],
      cta: "AUTHORIZE ARCHIVE ASSISTANT",
      linkDomain: "storage-consent.example",
      link: "https://{{linkDomain}}/authorize/{{id}}",
      clues: ["Unapproved third-party application", "Requests access to all company files", "Threat of automatic deletion", "Outside the approved environment"]
    }
  ],

  [
    {
      title: "Payroll Verification",
      brief: "A polished payroll lure asks for banking information.",
      internal: true,
      sender: "Pistosip Payroll Operations",
      local: "payroll-services",
      subject: "Direct deposit confirmation required",
      body: [
        "A validation error was detected in your direct-deposit profile.",
        "Payroll closes at {{deadline}} today.",
        "Re-enter your banking details to prevent a paper check.",
        "A delayed response may postpone payment."
      ],
      cta: "CONFIRM BANKING",
      link: "https://{{linkDomain}}/employee/banking/{{id}}",
      clues: ["Requests banking information", "Lookalike payroll domain", "End-of-day pressure", "Payroll changes belong in the bookmarked HR portal"]
    },
    {
      title: "Tax Statement Correction",
      brief: "A realistic tax notice requests identity and payroll data.",
      internal: true,
      sender: "Pistosip Tax Reporting",
      local: "tax-reporting",
      subject: "Correction required for annual tax statement",
      body: [
        "A mismatch was identified between payroll and tax records.",
        "Confirm your Social Security number and home address.",
        "The correction must be completed before filing closes.",
        "Use the secure employee form below."
      ],
      cta: "OPEN CORRECTION FORM",
      link: "https://{{linkDomain}}/tax/correction/{{ticket}}",
      clues: ["Requests highly sensitive personal data", "Lookalike internal domain", "Unexpected tax correction", "Email link replaces the normal HR workflow"]
    },
    {
      title: "Benefits Refund",
      brief: "A fake premium refund tries to collect payment-card information.",
      sender: "{{brand}} Benefits",
      local: "premium-refunds",
      subject: "You are owed a benefits premium refund",
      body: [
        "A payroll reconciliation found an overpayment of ${{amount}}.",
        "Select a card for immediate reimbursement.",
        "Refund eligibility expires on {{date}}.",
        "Bank transfer may take up to six weeks."
      ],
      cta: "CLAIM REFUND",
      link: "https://{{linkDomain}}/refund/{{code}}",
      clues: ["Unexpected refund", "Requests payment-card data", "Lookalike benefits domain", "Expiration pressure"]
    }
  ],

  [
    {
      title: "The Acquisition Packet",
      brief: "Accurate deal context and polished writing make the lure convincing.",
      sender: "{{person}} | {{brand}}",
      local: "{{personLocal}}",
      subject: "Re: {{project}} acquisition — final signature packet",
      body: [
        "Pete, the packet reflects {{managerFirst}}'s comments to Sections 8.2 and 11.4.",
        "Because it contains non-public financial information,",
        "the review link will remain available for 24 hours.",
        "Please acknowledge once the signature pages are complete."
      ],
      cta: "REVIEW PACKET",
      linkDomain: "review-sign.example",
      replyDomain: "review-sign.example",
      link: "https://{{linkDomain}}/{{projectSlug}}/{{code}}",
      clues: ["Subtle sender-domain impersonation", "Reply-To uses unrelated signing service", "Link is not the known legal portal", "Accurate context may come from stolen data or AI"]
    },
    {
      title: "Board Packet Review",
      brief: "A highly targeted board-document lure requests a fresh sign-in.",
      sender: "{{person}} | {{brand}}",
      local: "{{personLocal}}",
      subject: "Confidential board packet — revised risk appendix",
      body: [
        "Pete, the appendix now includes the cyber-risk revisions.",
        "The chair requested acknowledgement before {{deadline}}.",
        "Open the packet and authenticate with your company account.",
        "Forwarding and downloads are disabled."
      ],
      cta: "OPEN BOARD PACKET",
      linkDomain: "board-review.example",
      replyDomain: "board-review.example",
      link: "https://{{linkDomain}}/packet/{{id}}",
      clues: ["Unfamiliar board portal", "Fresh company login requested", "Confidentiality discourages consultation", "Highly specific context can be fabricated"]
    },
    {
      title: "Audit Evidence Request",
      brief: "A precise audit request attempts to collect sensitive evidence.",
      sender: "{{person}} | {{brand}}",
      local: "{{personLocal}}",
      subject: "Re: audit item {{id}} — privileged access evidence",
      body: [
        "Pete, item {{id}} remains open in the audit tracker.",
        "Upload the privileged-access export and administrator list.",
        "Use the temporary evidence workspace below.",
        "The auditors need the files before {{deadline}}."
      ],
      cta: "UPLOAD EVIDENCE",
      linkDomain: "audit-evidence.example",
      replyDomain: "audit-evidence.example",
      link: "https://{{linkDomain}}/request/{{id}}",
      clues: ["Requests highly sensitive security evidence", "Temporary unfamiliar workspace", "Reply-To and portal are unrelated to auditor", "Deadline pressure"]
    }
  ],

  [
    {
      title: "The Compromised Vendor",
      brief: "The From address is legitimate; process discipline is the final defense.",
      realDomain: true,
      replyLookalike: true,
      sender: "{{person}} | {{brand}}",
      local: "{{personLocal}}",
      subject: "Re: incident response retainer — evidence package",
      body: [
        "Pete, the evidence package is ready.",
        "Our primary portal is under emergency maintenance.",
        "Open the HTML launcher and enter code {{code}}.",
        "The package expires tonight."
      ],
      attachment: "Evidence_Access_{{caseId}}.html",
      clues: ["Legitimate vendor address may be compromised", "Reply-To changed to another domain", "HTML attachment can launch credential theft", "Sudden portal change and expiration pressure"]
    },
    {
      title: "The Compromised Internal Account",
      brief: "A real internal address sends an abnormal request outside normal systems.",
      internal: true,
      realDomain: true,
      replyLookalike: true,
      sender: "{{manager}}",
      local: "{{managerLocal}}",
      subject: "Re: {{project}} — confidential document review",
      body: [
        "Pete, I moved the document outside the project workspace",
        "because the internal permissions are delaying the review.",
        "Use the temporary portal and approve the access prompt.",
        "Please complete this before {{deadline}}."
      ],
      cta: "OPEN TEMPORARY PORTAL",
      linkDomain: "project-review.example",
      link: "https://{{linkDomain}}/{{projectSlug}}/{{code}}",
      clues: ["Real internal account may be compromised", "Request bypasses approved workspace", "External temporary portal", "Unexpected access-approval prompt"]
    },
    {
      title: "Cloud Support Session",
      brief: "A legitimate support identity requests a session token through a false portal.",
      realDomain: true,
      replyLookalike: true,
      sender: "{{person}} | {{brand}} Support",
      local: "{{personLocal}}",
      subject: "Re: support case {{ticket}} — diagnostic session",
      body: [
        "We isolated the cause of case {{ticket}}.",
        "To validate the fix, upload the browser session export.",
        "The secure support workspace is available for 30 minutes.",
        "Do not regenerate the token until diagnostics finish."
      ],
      cta: "OPEN SUPPORT WORKSPACE",
      linkLookalike: true,
      link: "https://{{linkDomain}}/support/{{ticket}}",
      clues: ["Legitimate vendor account may be compromised", "Requests reusable session material", "Reply-To and portal differ from normal", "Short deadline suppresses verification"]
    }
  ]
];

const CTP_USED_ADDRESSES = new Set();

function ctpSlug(value) {
  return String(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function ctpPersonLocal(name) {
  return String(name).toLowerCase().replace(/[^a-z\s]/g, "").trim().replace(/\s+/g, ".");
}

function ctpBrandFile(name) {
  return String(name).replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function ctpInterpolate(value, context) {
  if (Array.isArray(value)) return value.map(item => ctpInterpolate(item, context));
  if (typeof value !== "string") return value;
  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] !== undefined ? String(context[key]) : "");
}

function ctpHash(value) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function ctpLogoFor(brand) {
  const hash = ctpHash(brand.name);
  const palette = CTP_LOGO_PALETTES[hash % CTP_LOGO_PALETTES.length];
  return {
    mark: brand.name.split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join("").toUpperCase(),
    primary: palette[0],
    secondary: palette[1],
    shape: hash % 5
  };
}

function ctpLookalikeDomain(domain, style = 0) {
  const base = domain.replace(/\.example$/i, "");
  if (domain === "pistosip.com") {
    return ["pistosip-security.example", "pistosip-services.example", "pistosip-portal.example"][style % 3];
  }
  if (style % 3 === 0) {
    const altered = base.replace(/o/i, "0").replace(/i/i, "l");
    return `${altered === base ? `${base}-verify` : altered}.example`;
  }
  return style % 3 === 1 ? `${base}-secure.example` : `${base}-portal.example`;
}

function ctpUniqueAddress(local, domain, ordinal) {
  const cleanLocal = String(local).toLowerCase().replace(/[^a-z0-9._-]/g, ".").replace(/\.+/g, ".").replace(/^\.|\.$/g, "") || "notifications";
  let address = `${cleanLocal}@${domain}`;
  if (CTP_USED_ADDRESSES.has(address)) address = `${cleanLocal}.${String(ordinal + 1).padStart(2, "0")}@${domain}`;
  CTP_USED_ADDRESSES.add(address);
  return address;
}

function ctpContext(packIndex, variant) {
  const person = CTP_PEOPLE[packIndex % CTP_PEOPLE.length];
  const manager = CTP_PEOPLE[(packIndex + 7) % CTP_PEOPLE.length];
  const project = CTP_PROJECTS[(packIndex + variant) % CTP_PROJECTS.length];
  const amount = 185 + ((packIndex * 347 + variant * 913) % 9800);
  return {
    person,
    manager,
    personFirst: person.split(" ")[0],
    managerFirst: manager.split(" ")[0],
    personLocal: ctpPersonLocal(person),
    managerLocal: ctpPersonLocal(manager),
    id: 42000 + packIndex * 37 + variant,
    invoice: `INV-${48000 + packIndex * 23 + variant}`,
    po: `PO-${23000 + packIndex * 19 + variant}`,
    amount: amount.toLocaleString("en-US"),
    deadline: CTP_DEADLINES[(packIndex + variant) % CTP_DEADLINES.length],
    weekday: CTP_WEEKDAYS[(packIndex + variant) % CTP_WEEKDAYS.length],
    date: `June ${11 + ((packIndex + variant) % 18)}`,
    month: ["June", "July", "August"][(packIndex + variant) % 3],
    project,
    projectSlug: ctpSlug(project),
    city: CTP_CITIES[(packIndex + variant) % CTP_CITIES.length],
    device: ["Windows 11 / Chrome", "macOS / Safari", "iPhone / Mobile Safari", "Linux / Firefox"][(packIndex + variant) % 4],
    caseId: `CASE-${3100 + packIndex * 11 + variant}`,
    orderId: `ORD-${8400 + packIndex * 13 + variant}`,
    ticket: `SR-${6500 + packIndex * 17 + variant}`,
    code: String(100000 + ((packIndex * 9413 + variant * 773) % 899999))
  };
}

function ctpBuildEmail(spec, brand, context, phish, variant, packIndex, slot) {
  const fromDomain = spec.fromDomain || (phish && !spec.realDomain ? ctpLookalikeDomain(brand.domain, variant) : brand.domain);
  const replyDomain = spec.replyDomain || (spec.replyLookalike ? ctpLookalikeDomain(brand.domain, variant + 1) : fromDomain);
  const linkDomain = spec.linkDomain || (spec.linkLookalike || phish ? ctpLookalikeDomain(brand.domain, variant + 2) : brand.domain);
  const full = {
    ...context,
    brand: brand.name,
    domain: fromDomain,
    legitimateDomain: brand.domain,
    replyDomain,
    linkDomain,
    brandSlug: ctpSlug(brand.name),
    brandFile: ctpBrandFile(brand.name)
  };
  const sender = ctpInterpolate(spec.sender, full);
  const local = ctpInterpolate(spec.local, full);
  const address = ctpUniqueAddress(local, fromDomain, packIndex * 4 + slot);
  const reply = (spec.replyDomain || spec.replyLookalike)
    ? ctpUniqueAddress(ctpInterpolate(spec.replyLocal || local, full), replyDomain, 500 + packIndex * 4 + slot)
    : address;
  return {
    id: `ctp-p${packIndex}-e${slot}`,
    sender,
    address,
    reply,
    time: `${7 + ((packIndex + slot * 2) % 10)}:${String((11 + packIndex * 7 + slot * 13) % 60).padStart(2, "0")} ${packIndex % 2 ? "PM" : "AM"}`,
    subject: ctpInterpolate(spec.subject, full),
    banner: spec.banner !== undefined ? spec.banner : (fromDomain === "pistosip.com" ? "" : "External sender"),
    body: ctpInterpolate(spec.body, full),
    cta: ctpInterpolate(spec.cta || "", full),
    link: ctpInterpolate(spec.link || "", full),
    attachment: ctpInterpolate(spec.attachment || "", full),
    phish,
    clues: phish ? ctpInterpolate(spec.clues || [], full) : [],
    logo: ctpLogoFor(brand)
  };
}

function ctpLegitSpec(type, context) {
  const specs = {
    benefits: { internal: true, sender: "People Operations", local: "people", subject: "Benefits enrollment confirmation", body: ["Hi Pete,", "Your benefit selections were saved successfully.", "No action is required.", "A confirmation is available in the HR portal."], attachment: "Benefits_Confirmation_{{id}}.pdf" },
    agenda: { internal: true, sender: "{{person}}", local: "{{personLocal}}", subject: "{{project}} review agenda", body: ["Pete,", "I added the vendor-risk discussion to the agenda.", "Please send additional topics by {{deadline}}.", "The meeting remains scheduled for {{weekday}}."], attachment: "{{project}}_Agenda.docx" },
    shipment: { sender: "{{brand}} Orders", local: "orders", subject: "Your order {{orderId}} has shipped", body: ["Your approved order shipped this morning.", "Estimated delivery: {{date}}.", "Tracking number: {{orderId}}.", "View the shipment in the vendor portal."], cta: "VIEW SHIPMENT", link: "https://portal.{{domain}}/orders/{{orderId}}" },
    invoice: { sender: "{{brand}} Billing", local: "billing", subject: "Invoice {{invoice}} — approved order", body: ["Attached is invoice {{invoice}}.", "Purchase order: {{po}}.", "Standard payment terms are Net 30.", "Reply if your records do not match ours."], attachment: "Invoice_{{invoice}}.pdf" },
    expense: { internal: true, sender: "Expense Operations", local: "expenses", subject: "Expense report {{id}} approved", body: ["Your expense report was approved by Finance.", "Reimbursement will appear in the next payroll cycle.", "No additional action is required.", "Reference number: ER-{{id}}."], attachment: "Expense_Summary_{{id}}.pdf" },
    legal: { sender: "{{person}} | {{brand}}", local: "{{personLocal}}", subject: "Redlines to {{project}} services agreement", body: ["Pete,", "Attached are our redlines to the services agreement.", "I highlighted the indemnification changes discussed yesterday.", "Please send questions before our {{deadline}} call."], attachment: "{{project}}_Agreement_Redlines.docx" },
    share: { internal: true, sender: "Pistosip Files", local: "files", subject: "{{project}} schedule was shared with you", body: ["{{person}} shared the project schedule.", "Access was granted to the project team.", "Open it in the Pistosip Files portal.", "It is also available under Shared with Me."], cta: "OPEN PISTOSIP FILES", link: "https://files.pistosip.com/shared/{{id}}" },
    project: { sender: "{{brand}} Projects", local: "projects", subject: "Updated project plan available", body: ["The revised {{project}} plan is available.", "Revision: {{date}}-FINAL.", "Use the existing project-portal bookmark", "or the link below."], cta: "VIEW PROJECT", link: "https://portal.{{domain}}/projects/{{projectSlug}}" },
    calendar: { internal: true, sender: "Calendar Service", local: "calendar", subject: "Meeting notes added: {{project}}", body: ["Meeting notes were added to yesterday's event.", "The notes are available in the event details.", "Attendees include Pete, {{person}}, and {{manager}}.", "No response is required."], cta: "VIEW EVENT", link: "https://calendar.pistosip.com/event/{{id}}" },
    forecast: { internal: true, sender: "{{manager}}", local: "{{managerLocal}}", subject: "Please review the revised forecast", body: ["Pete,", "Finance posted the revised forecast.", "Please review the security-services assumptions before {{weekday}}.", "We can discuss changes during the staff meeting."], cta: "OPEN REPORTING PORTAL", link: "https://finance.pistosip.com/forecast/{{id}}" },
    hr: { internal: true, sender: "People Operations", local: "people", subject: "Leadership offsite preferences", body: ["We are finalizing the leadership offsite.", "Please update dietary preferences in the HR portal", "by {{deadline}} on {{weekday}}.", "Contact People Operations with questions."], cta: "UPDATE PREFERENCES", link: "https://hr.pistosip.com/offsite/{{id}}" },
    meeting: { sender: "{{brand}} Account Team", local: "account-team", subject: "{{weekday}} meeting moved to {{deadline}}", body: ["The project meeting moved to {{deadline}}.", "The conference link and attendee list are unchanged.", "We updated the existing calendar invitation.", "Let us know if the new time does not work."] },
    security: { internal: true, sender: "Pistosip Security Operations", local: "security", subject: "Blocked sign-in attempt on your account", body: ["Security Operations blocked an unusual sign-in attempt.", "No session was created.", "Open portal.pistosip.com using your saved bookmark.", "Contact the SOC if you do not recognize the activity."] },
    vault: { internal: true, sender: "Pistosip Vault", local: "vault-alerts", subject: "New device added to your vault account", body: ["A new device was added after successful MFA.", "Device: {{device}}.", "Review trusted devices in the Vault portal.", "No action is required if you recognize it."], cta: "REVIEW DEVICES", link: "https://vault.pistosip.com/devices" },
    billing: { sender: "{{brand}} Billing", local: "billing", subject: "Your {{month}} statement is ready", body: ["Your {{month}} business statement is available.", "Amount due: ${{amount}}.", "Automatic payment is scheduled for {{date}}.", "View the statement in your account."], cta: "VIEW STATEMENT", link: "https://business.{{domain}}/billing/{{id}}" },
    capacity: { sender: "{{person}} | {{brand}}", local: "{{personLocal}}", subject: "Re: {{project}} capacity planning", body: ["Pete, I added the updated capacity model to the portal.", "The only change is the {{month}} storage forecast.", "No contract or billing changes are included.", "We can review it on {{weekday}}."], cta: "OPEN CUSTOMER PORTAL", link: "https://customers.{{domain}}/capacity/{{projectSlug}}" },
    procurement: { internal: true, sender: "Procurement", local: "procurement", subject: "Renewal workflow opened for {{brand}}", body: ["The {{brand}} renewal workflow is now open.", "The approved payment profile is attached.", "Banking changes must be verified by Procurement", "using the vendor phone number already on file."], attachment: "{{brandFile}}_Renewal_Summary.pdf" },
    grc: { internal: true, sender: "{{person}}", local: "{{personLocal}}", subject: "Re: Vendor review assignments", body: ["I completed the {{brand}} questionnaire review.", "There are two low-risk exceptions for approval.", "The findings are in the GRC system under VR-{{id}}.", "Nothing needs to be sent to the vendor."], cta: "OPEN GRC REVIEW", link: "https://grc.pistosip.com/reviews/VR-{{id}}" },
    appapproval: { internal: true, sender: "Identity Governance", local: "identity", subject: "Approved app request: {{brand}} Connect", body: ["Service request IAM-{{id}} was approved.", "Requested permission: Basic profile only.", "Install it from the Company Apps portal.", "Do not approve permissions from email prompts."], cta: "OPEN COMPANY APPS", link: "https://apps.pistosip.com/catalog/{{brandSlug}}" },
    teams: { internal: true, sender: "Pistosip Teams", local: "teams", subject: "You were added to the {{project}} team", body: ["{{person}} added you to {{project}}.", "The team contains the checklist and meeting notes.", "Open the Teams application to view it.", "No new application permissions are required."], cta: "OPEN TEAMS", link: "https://teams.pistosip.com/team/{{projectSlug}}" },
    newsletter: { sender: "{{brand}} Security Briefing", local: "newsletter", subject: "This week: Identity attacks move beyond passwords", body: ["This briefing covers OAuth consent phishing,", "session-cookie theft, and token replay.", "It contains no attachment or login request.", "Manage subscriptions on the publication website."], cta: "READ BRIEFING", link: "https://{{domain}}/briefings/{{id}}" },
    payroll: { internal: true, sender: "Payroll", local: "payroll", subject: "Your annual tax statement is available", body: ["Your annual tax statement is available in the HR portal.", "Open hr.pistosip.com from your saved bookmark.", "Payroll will never request banking details by email.", "Use the employee directory for questions."] },
    bankalert: { sender: "{{brand}} Alerts", local: "alerts", subject: "Deposit received in business checking", body: ["A deposit was posted to your business account.", "Reference ending: {{code}}.", "This notification requires no response.", "Use the mobile application for details."] },
    tabletop: { internal: true, sender: "{{manager}}", local: "{{managerLocal}}", subject: "Payroll continuity tabletop notes", body: ["Thanks for participating in today's tabletop.", "The action items are attached.", "Finance owns the provider follow-up.", "Security owns the identity-recovery item."], attachment: "Payroll_Tabletop_Actions_{{id}}.pdf" },
    legalquestions: { sender: "{{person}} | {{brand}}", local: "{{personLocal}}", subject: "Re: {{project}} — disclosure questions", body: ["Pete, I have three questions on the schedules.", "They are marked on pages 14, 22, and 31.", "No signature is needed yet.", "We can cover them during the {{deadline}} call."], attachment: "{{project}}_Disclosure_Questions.pdf" },
    dealtracker: { internal: true, sender: "{{project}} Deal Team", local: "{{projectSlug}}-team", subject: "{{project}} diligence tracker updated", body: ["The diligence tracker was updated after this morning's call.", "Legal owns items 42 through 47.", "Finance owns revenue reconciliation.", "The tracker remains in the internal workspace."], cta: "OPEN PROJECT WORKSPACE", link: "https://projects.pistosip.com/{{projectSlug}}/diligence" },
    signature: { sender: "{{brand}} Signatures", local: "notifications", subject: "Completed: Mutual NDA — {{project}}", body: ["All parties completed the Mutual NDA.", "The final document is attached for your records.", "Envelope ID: SC-{{id}}-{{code}}.", "No additional signature or login is required."], attachment: "Completed_Mutual_NDA.pdf" },
    vendorir: { sender: "{{person}} | {{brand}}", local: "{{personLocal}}", subject: "Re: incident response retainer — kickoff notes", body: ["Pete, attached are the kickoff notes and contact matrix.", "The evidence portal remains unchanged.", "We will not send launchers or passwords by email.", "Call the hotline for urgent activation."], attachment: "IR_Kickoff_Notes_{{caseId}}.pdf" },
    evidence: { internal: true, sender: "Pistosip Security Operations", local: "security", subject: "Evidence-handling reminder", body: ["Use only the approved repository for active cases.", "Do not open HTML launchers or alternate portals.", "Verify process changes using the vendor hotline on file.", "Report unexpected requests to the SOC."], cta: "OPEN EVIDENCE PORTAL", link: "https://evidence.pistosip.com/cases" },
    status: { sender: "{{brand}} Status", local: "status", subject: "Scheduled maintenance for customer analytics", body: ["Customer analytics will be unavailable on {{weekday}}.", "Evidence and support portals are not affected.", "No user action is required.", "Updates will appear on the status website."], cta: "VIEW STATUS", link: "https://status.{{domain}}" }
  };
  return specs[type];
}

function buildCatchThePhishPackLibrary() {
  CTP_USED_ADDRESSES.clear();
  const packs = [];
  for (let difficulty = 1; difficulty <= 10; difficulty++) {
    for (let variant = 0; variant < 3; variant++) {
      const packIndex = (difficulty - 1) * 3 + variant;
      const context = ctpContext(packIndex, variant);
      const phishSpec = CTP_PHISH_SPECS[difficulty - 1][variant];
      const phishBrand = phishSpec.internal ? CTP_INTERNAL_BRAND : CTP_BRANDS[packIndex % CTP_BRANDS.length];
      const phish = ctpBuildEmail(phishSpec, phishBrand, context, true, variant, packIndex, 0);
      const decoys = CTP_DECOYS_BY_DIFFICULTY[difficulty - 1].map((type, index) => {
        const spec = ctpLegitSpec(type, context);
        const brand = spec.internal ? CTP_INTERNAL_BRAND : CTP_BRANDS[(packIndex * 3 + index + 7) % CTP_BRANDS.length];
        return ctpBuildEmail(spec, brand, context, false, variant, packIndex, index + 1);
      });
      packs.push({
        id: `ctp-pack-d${difficulty}-v${variant}`,
        difficultyNumber: difficulty,
        variant,
        title: phishSpec.title,
        difficulty: `${difficulty} / 10 — ${CTP_DIFFICULTY_NAMES[difficulty - 1]}`,
        brief: phishSpec.brief,
        emails: [phish, ...decoys]
      });
    }
  }
  return packs;
}

const CATCH_THE_PHISH_PACK_LIBRARY = buildCatchThePhishPackLibrary();
const CATCH_THE_PHISH_EMAIL_LIBRARY = CATCH_THE_PHISH_PACK_LIBRARY.flatMap(pack => pack.emails);

if (CATCH_THE_PHISH_PACK_LIBRARY.length !== 30) throw new Error("Expected 30 reusable email packs.");
if (CATCH_THE_PHISH_EMAIL_LIBRARY.length !== 120) throw new Error("Expected exactly 120 emails.");
if (new Set(CATCH_THE_PHISH_EMAIL_LIBRARY.map(email => email.address)).size !== 120) throw new Error("Expected 120 unique From addresses.");
if (CATCH_THE_PHISH_EMAIL_LIBRARY.filter(email => email.phish).length !== 30) throw new Error("Expected exactly 30 phishing emails.");
for (const pack of CATCH_THE_PHISH_PACK_LIBRARY) {
  if (pack.emails.filter(email => email.phish).length !== 1) throw new Error(`Pack ${pack.id} must contain exactly one phishing email.`);
}

function selectCatchThePhishModules() {
  let history = {};
  try {
    history = JSON.parse(localStorage.getItem("catchThePhishVariantHistory") || "{}");
  } catch (_) {
    history = {};
  }

  const selected = [];
  for (let difficulty = 1; difficulty <= 10; difficulty++) {
    const previous = Number.isInteger(history[difficulty]) ? history[difficulty] : -1;
    const variant = previous === -1 ? Math.floor(Math.random() * 3) : (previous + 1) % 3;
    const pack = CATCH_THE_PHISH_PACK_LIBRARY.find(item => item.difficultyNumber === difficulty && item.variant === variant);
    selected.push(pack);
    history[difficulty] = variant;
  }

  try {
    localStorage.setItem("catchThePhishVariantHistory", JSON.stringify(history));
  } catch (_) {
    // The challenge still works when storage is unavailable.
  }
  return selected;
}

window.CATCH_THE_PHISH_PACK_LIBRARY = CATCH_THE_PHISH_PACK_LIBRARY;
window.CATCH_THE_PHISH_EMAIL_LIBRARY = CATCH_THE_PHISH_EMAIL_LIBRARY;
window.selectCatchThePhishModules = selectCatchThePhishModules;
