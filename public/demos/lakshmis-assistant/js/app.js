(() => {
  const COLORS = ["#00a884", "#53bdeb", "#f06548", "#c4b5fd", "#f59e0b", "#34d399", "#fb7185"];
  const colorFor = (n) => COLORS[[...n].reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length];
  const initials = (n) => n.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const HOLD_CUSTOM =
    "Thank you for your enquiry! Please give us a little time to check the requirements and confirm whether we can accommodate your order. We’ll get back to you shortly.";
  const HOLD_COMPLAINT =
    "We’re sorry for the inconvenience. Please give us a little time to look into what happened and discuss the best way to resolve this. We’ll get back to you shortly.";

  const state = {
    view: "chats",
    filter: "all",
    search: "",
    selected: "priya",
    showInfo: true,
    mobileChat: false,
    aiGlobal: "on",
    toast: null,
    modal: null,
    typing: null,
    activity: [
      { t: "Today 16:02", text: "AI sent catalog options to Priya." },
      { t: "Today 16:18", text: "Priya confirmed 1 kg Rosette, name Arjun. Forwarded to you." },
      { t: "Today 17:04", text: "Meera: eggless chocolate answered from this week’s list." },
      { t: "Today 17:12", text: "Ravi 40 cupcakes — draft waiting. Not a booking." },
      { t: "Today 18:31", text: "Ananya complaint — hold sent, no refund." },
      { t: "Today 18:44", text: "Divya — assistant sent a booking for red velvet. That was wrong. Chat paused." },
    ],
    catalog: [
      { id: "choc", name: "Eggless chocolate", kg: 800, avail: true, swatch: "choc", note: "On this week’s list. Several chocolate variations." },
      { id: "rose", name: "Pink rosette (eggless)", kg: 900, avail: true, swatch: "rose", note: "Name on cake is a simple option." },
      { id: "fruit", name: "Fresh fruit cream", kg: 850, avail: true, swatch: "fruit", note: "Seasonal fruit." },
      { id: "velvet", name: "Red velvet", kg: 850, avail: true, swatch: "velvet", note: "Stale. Not actually this week — take it off after the Divya mistake." },
      { id: "photo", name: "Photo cake", kg: 1100, avail: false, swatch: "kit", note: "Custom + capability. AI must not confirm." },
    ],
    hours: "Tue–Sun, orders by 7pm. Pickup from home. Delivery 5–15 min grace is yours to explain — not AI.",
    calendar: { Saturday: "2 cakes already", Tomorrow: "2 cakes already" },
    rules: {
      routine: "auto",
      catalog: "auto",
      large: "approve",
      custom: "hold",
      complaint: "escalate",
      priceFinal: "approve",
      refund: "never",
      startKitchen: "never",
    },
    chats: {},
  };

  function msg(from, text, extra = {}) {
    return {
      from,
      text,
      time: extra.time || "16:00",
      kind: extra.kind || (from === "c" ? "c" : from === "ai" ? "ai" : from === "you" ? "you" : "sys"),
      sent: extra.sent !== false,
      cards: extra.cards || null,
      wrong: extra.wrong || false,
    };
  }

  state.chats = {
    priya: {
      name: "Priya",
      preview: "Yes, please confirm",
      time: "16:18",
      unread: 0,
      status: "resolved",
      handler: "ai",
      labels: ["AI handled", "Order in"],
      order: "1 kg Pink rosette · name Arjun · pickup tomorrow 5pm · ₹900 · not started until she confirms back",
      scenario: "s1-ok",
      messages: [
        msg("c", "Hi! I found you on WhatsApp. I’d love a cake for my son’s birthday — nothing too custom, just something pretty from what you already make.", { time: "15:41" }),
        msg("ai", "Hi Priya, this is Lakshmi’s Cakes (assistant). Lakshmi bakes every cake from scratch with fresh ingredients — no long-stored bases. I can show this week’s designs. If you need something that isn’t on the list, I’ll ask her.", { time: "15:41" }),
        msg("c", "How did she start? And is the kitchen clean? I care about hygiene.", { time: "15:42" }),
        msg("ai", "She runs a home bakery and handles baking and delivery herself. Cakes are prepared to order. I can share that she keeps a clean home kitchen — here’s what we show customers. For anything more specific, Lakshmi will talk to you.", {
          time: "15:42",
          cards: [{ id: "kit", title: "Home kitchen (photo)", sub: "Clean home kitchen — not a certificate" }],
        }),
        msg("ai", "Prices are per kg on the list. Simple option: change the name on the cake. Pickup from home, or delivery if she can take it.", { time: "15:43" }),
        msg("ai", "Designs on the list this week:", {
          time: "15:43",
          cards: [
            { id: "choc", title: "Eggless chocolate · ₹800/kg", sub: "On this week’s list" },
            { id: "rose", title: "Pink rosette · ₹900/kg", sub: "Name on cake" },
            { id: "fruit", title: "Fresh fruit cream · ₹850/kg", sub: "Seasonal" },
          ],
        }),
        msg("c", "The pink rosette, 1 kg. Can it say Arjun?", { time: "16:02" }),
        msg("ai", "Pink rosette, 1 kg, name “Arjun”. That’s a simple option on this design. Pickup or delivery, and when would you like it?", { time: "16:02" }),
        msg("c", "Pickup tomorrow 5pm.", { time: "16:10" }),
        msg("ai", "Summary (not started baking): 1 kg Pink rosette · name Arjun · pickup tomorrow 5pm · ₹900. Reply yes to confirm. Lakshmi will see this only after you confirm.", { time: "16:11" }),
        msg("c", "Yes, please confirm", { time: "16:18" }),
        msg("sys", "Customer confirmed. Order details forwarded to Lakshmi. Kitchen has not started until she checks tomorrow’s list.", { time: "16:18" }),
      ],
    },
    aarav: {
      name: "Aarav",
      preview: "Can you do a galaxy mirror glaze?",
      time: "16:40",
      unread: 1,
      status: "attention",
      handler: "ai",
      labels: ["Needs you", "Not in catalog"],
      order: "Wants galaxy mirror glaze — not on the list",
      scenario: "s1-fail",
      messages: [
        msg("c", "Hi, can you do a galaxy mirror glaze like the one on Instagram?", { time: "16:38" }),
        msg("ai", HOLD_CUSTOM, { time: "16:38" }),
        msg("ai", "That look isn’t on this week’s list, and I can’t promise a custom design. Lakshmi will check if she can do it.", { time: "16:39" }),
        msg("c", "Can you do a galaxy mirror glaze?", { time: "16:40" }),
      ],
    },
    meera: {
      name: "Meera",
      preview: "Do you have eggless chocolate today?",
      time: "17:04",
      unread: 0,
      status: "waiting",
      handler: "ai",
      labels: ["AI handled", "Not booked"],
      order: "Eggless chocolate — time not chosen",
      scenario: "eggless",
      messages: [
        msg("c", "Hi aunty, do you have the eggless chocolate cake today?", { time: "17:03" }),
        msg("ai", "Yes, eggless chocolate is on this week’s list. Which chocolate (plain, or with extra filling)? When would you like it? Pickup from home is possible once we pick a time.", { time: "17:04" }),
      ],
    },
    ravi: {
      name: "Ravi",
      preview: "40 cupcakes Saturday — draft not sent",
      time: "17:12",
      unread: 0,
      status: "awaiting",
      handler: "ai",
      labels: ["Awaiting you", "Not confirmed"],
      order: "40 cupcakes Sat 4pm pickup · vanilla 24 / chocolate 16 · draft ₹4,000 not sent",
      scenario: "large",
      messages: [
        msg("c", "I need 40 cupcakes for an office party on Saturday. What’s the price?", { time: "17:05" }),
        msg("ai", "I can collect details. Number, flavours, pickup or delivery, time. I won’t book Saturday or send a final price until Lakshmi checks.", { time: "17:06" }),
        msg("c", "24 vanilla, 16 chocolate. Pickup 4pm from her place.", { time: "17:10" }),
        msg("ai", "Overview for Lakshmi — not a booking. 40 cupcakes, 24 vanilla / 16 chocolate, Saturday 4pm pickup. List would be ₹4,000 if no extra design. Saturday already has 2 cakes.", { time: "17:11" }),
        msg("ai", "Saturday 4pm pickup works for 40 cupcakes (24 vanilla, 16 chocolate), ₹4,000. If you want a specific design, send a picture first. Reply “yes” and I’ll start — I won’t bake until you confirm.", {
          time: "17:12",
          kind: "draft",
          sent: false,
        }),
      ],
    },
    ananya: {
      name: "Ananya",
      preview: "It’s 6:30. Very disappointed.",
      time: "18:31",
      unread: 1,
      status: "attention",
      handler: "ai",
      labels: ["Needs you", "No resolution"],
      order: "Chocolate cake due 5:00 · wrote at 6:30",
      scenario: "complaint",
      messages: [
        msg("c", "My order was supposed to come at 5. It’s 6:30. Very disappointed.", { time: "18:30" }),
        msg("ai", HOLD_COMPLAINT, { time: "18:31" }),
        msg("ai", "Has the cake reached you, or are you still waiting?", { time: "18:31" }),
      ],
    },
    rahul: {
      name: "Rahul",
      preview: "2 kg photo cake tomorrow?",
      time: "17:40",
      unread: 0,
      status: "attention",
      handler: "ai",
      labels: ["Needs you", "Not promised"],
      order: "2 kg photo cake · tomorrow morning · 2 cakes already tomorrow",
      scenario: "custom",
      messages: [
        msg("c", "Can you make a 2 kg photo cake by tomorrow morning? Urgent please", { time: "17:38" }),
        msg("ai", HOLD_CUSTOM, { time: "17:38" }),
      ],
    },
    kiran: {
      name: "Kiran",
      preview: "Draft says yes to tomorrow — don’t send",
      time: "17:55",
      unread: 0,
      status: "awaiting",
      handler: "ai",
      labels: ["Awaiting you", "Wrong draft"],
      order: "Asked for photo cake tomorrow — AI drafted a yes",
      scenario: "mistake",
      messages: [
        msg("c", "Photo cake tomorrow morning possible?", { time: "17:54" }),
        msg("ai", "Yes, 2 kg photo cake tomorrow morning is booked.", {
          time: "17:55",
          kind: "draft",
          sent: false,
        }),
      ],
    },
    divya: {
      name: "Divya",
      preview: "You’re booked for 6pm — this already went out",
      time: "18:44",
      unread: 1,
      status: "promised",
      handler: "ai",
      pausedHere: true,
      repaired: false,
      catalogFixed: false,
      labels: ["It promised", "Wrong send"],
      order: "1 kg red velvet · 6pm pickup — assistant said booked. Not on this week’s real list. Kitchen must not start.",
      scenario: "sent-mistake",
      messages: [
        msg("c", "Hi, do you have red velvet today? 1 kg, pickup around 6?", { time: "18:42" }),
        msg(
          "ai",
          "Yes, red velvet is on this week’s list. 1 kg ₹850. You’re booked for 6pm pickup.",
          { time: "18:44", wrong: true }
        ),
        msg("sys", "Assistant paused in this chat. The customer already has a yes you did not send.", { time: "18:44" }),
      ],
    },
  };

  const FILTERS = [
    ["all", "All"],
    ["unread", "Unread"],
    ["attention", "Needs attention"],
    ["ai", "AI handled"],
    ["awaiting", "Awaiting approval"],
    ["owner", "Owner handling"],
  ];

  function toast(text) {
    state.toast = text;
    render();
    setTimeout(() => {
      if (state.toast === text) {
        state.toast = null;
        render();
      }
    }, 2200);
  }

  function log(text) {
    state.activity.unshift({ t: "Now " + nowTime(), text });
  }

  function chatList() {
    const q = state.search.trim().toLowerCase();
    return Object.entries(state.chats)
      .map(([id, c]) => ({ id, ...c }))
      .filter((c) => {
        if (q && !c.name.toLowerCase().includes(q) && !c.preview.toLowerCase().includes(q)) return false;
        if (state.filter === "unread") return c.unread > 0;
        if (state.filter === "attention") return c.status === "attention" || c.status === "promised";
        if (state.filter === "ai") return c.status === "waiting" || c.status === "resolved";
        if (state.filter === "awaiting") return c.status === "awaiting";
        if (state.filter === "owner") return c.status === "owner";
        return true;
      });
  }

  function statusLabel(s) {
    return {
      resolved: ["AI handled", "ok"],
      waiting: ["Waiting on them", "ai"],
      awaiting: ["Awaiting you", "wait"],
      attention: ["Needs you", "need"],
      promised: ["It promised", "need"],
      owner: ["You’re speaking", "you"],
    }[s] || [s, ""];
  }

  function paused() {
    return state.aiGlobal === "paused";
  }

  function html(strings, ...vals) {
    return strings.reduce((a, s, i) => a + s + (vals[i] ?? ""), "");
  }

  function render() {
    const root = document.getElementById("app");
    if (state.view !== "chats") {
      root.innerHTML = html`<div class="shell full">${renderView()}</div>${renderToast()}${renderModal()}`;
      bind();
      return;
    }
    const cls = ["shell"];
    if (!state.showInfo) cls.push("no-info");
    if (state.showInfo) cls.push("show-info");
    if (state.mobileChat) cls.push("show-chat");
    root.innerHTML = html`<div class="${cls.join(" ")}">${renderSide()}${renderChat()}${state.showInfo ? renderInfo() : ""}</div>${renderToast()}${renderModal()}`;
    bind();
    const box = document.querySelector(".msgs");
    if (box) box.scrollTop = box.scrollHeight;
  }

  function renderToast() {
    return state.toast ? `<div class="toast">${esc(state.toast)}</div>` : "";
  }
  function renderModal() {
    if (!state.modal) return "";
    const m = state.modal;
    return html`<div class="modal" data-act="closemodal">
      <div class="box" onclick="event.stopPropagation()">
        <h3 style="margin:0 0 .6rem">${esc(m.title)}</h3>
        <textarea id="modal-text" rows="5" style="width:100%;font:inherit;padding:.5rem">${esc(m.value)}</textarea>
        <div style="display:flex;gap:.4rem;margin-top:.7rem;justify-content:flex-end">
          <button class="btn ghost" data-act="closemodal">Cancel</button>
          <button class="btn main" data-act="modalsave">Save & send</button>
        </div>
      </div>
    </div>`;
  }

  function renderSide() {
    const rows = chatList();
    return html`<aside class="side">
      <div class="side-head">
        <div class="avatar" style="background:#fff;color:var(--teal)">LC</div>
        <div>
          <h1>Lakshmi’s Cakes</h1>
          <p>${paused() ? "AI paused" : "AI on · WhatsApp"}</p>
        </div>
        <div class="side-actions">
          <button class="icon-btn" title="Approvals" data-act="view" data-v="approvals">✓</button>
          <button class="icon-btn" title="Activity" data-act="view" data-v="activity">☰</button>
          <button class="icon-btn" title="AI & business" data-act="view" data-v="settings">⚙</button>
        </div>
      </div>
      <div class="banner ${paused() ? "pause" : "on"}">
        <span>${paused() ? "Assistant is paused for everyone." : "Assistant may reply on routine & catalog."}</span>
        <button class="btn ghost" data-act="toggleai">${paused() ? "Resume" : "Pause AI"}</button>
      </div>
      <div class="search-wrap"><input id="search" placeholder="Search or start a chat" value="${esc(state.search)}" /></div>
      <div class="filters">
        ${FILTERS.map(([id, lab]) => `<button class="chip ${state.filter === id ? "on" : ""}" data-act="filter" data-id="${id}">${lab}</button>`).join("")}
      </div>
      <div class="list">
        ${rows.length ? rows.map(renderRow).join("") : `<div class="empty">No chats in this filter.</div>`}
      </div>
    </aside>`;
  }

  function renderRow(c) {
    const [lab, cls] = statusLabel(c.status);
    return html`<div class="row ${state.selected === c.id ? "sel" : ""}" data-act="open" data-id="${c.id}">
      <div class="avatar" style="background:${colorFor(c.name)}">${initials(c.name)}</div>
      <div>
        <strong>${esc(c.name)}</strong>
        <div class="preview">${esc(c.preview)}</div>
        <div class="tags"><span class="tag ${cls}">${lab}</span>${c.unread ? "" : ""}</div>
      </div>
      <div class="meta">
        ${esc(c.time)}
        ${c.unread ? `<div class="unread">${c.unread}</div>` : ""}
      </div>
    </div>`;
  }

  function renderChat() {
    const c = state.chats[state.selected];
    if (!c) return `<section class="chat"><div class="empty">Select a chat</div></section>`;
    const [lab, cls] = statusLabel(c.status);
    const lastDraft = [...c.messages].reverse().find((m) => m.kind === "draft" && !m.sent);
    return html`<section class="chat">
      <div class="chat-head">
        <button class="icon-btn" data-act="back" title="Chats">‹</button>
        <div class="avatar sm" style="background:${colorFor(c.name)}">${initials(c.name)}</div>
        <div>
          <h2>${esc(c.name)}</h2>
          <div class="sub">${c.handler === "owner" ? "You are speaking" : paused() ? "AI paused for everyone" : c.pausedHere ? "Assistant paused in this chat" : "AI may reply on allowed topics"}${c.handler === "owner" ? "" : ` · <span class="tag ${cls}">${esc(lab)}</span>`}</div>
        </div>
        <div class="head-btns">
          <button class="btn ghost" data-act="toggleinfo">${state.showInfo ? "Hide details" : "Details"}</button>
          ${c.handler === "owner"
            ? `<button class="btn ghost" data-act="resume">Unmute AI in this chat</button><button class="btn ghost" data-act="resolve">Mark resolved</button>`
            : `<button class="btn warn" data-act="takeover">Take over</button>`}
        </div>
      </div>
      <div class="msgs">
        ${c.messages.map(renderMsg).join("")}
        ${state.typing === c.id ? `<div class="typing">Assistant is typing…</div>` : ""}
      </div>
      ${lastDraft ? renderDraftBar(lastDraft) : ""}
      ${c.scenario === "sent-mistake" ? renderRecoveryBar(c) : ""}
      <div class="composer">
        <div class="quick">${quickFor(c).map((q) => `<button class="qchip" data-act="quick" data-t="${esc(q)}">${esc(q)}</button>`).join("")}</div>
        <div class="comp-row">
          <button class="icon-btn" title="Attach" data-act="attach">＋</button>
          <textarea id="composer" rows="1" placeholder="${c.handler === "owner" ? "Message as Lakshmi" : "Message as you — AI stays paused if you send"}"></textarea>
          <button class="send" data-act="send">➤</button>
        </div>
      </div>
    </section>`;
  }

  function renderDraftBar(d) {
    return html`<div class="suggest" style="margin:.5rem 1rem">
      <strong>Not sent · awaiting you</strong>
      <p style="margin:.3rem 0">${esc(d.text)}</p>
      <div style="display:flex;gap:.35rem;flex-wrap:wrap">
        <button class="btn main" data-act="approve">Approve & send</button>
        <button class="btn ghost" data-act="editdraft">Edit</button>
        <button class="btn danger" data-act="reject">Reject</button>
      </div>
    </div>`;
  }

  function renderRecoveryBar(c) {
    if (c.repaired && c.catalogFixed) {
      return html`<div class="suggest" style="margin:.5rem 1rem">
        <strong>Corrected · list updated</strong>
        <p style="margin:.3rem 0">You spoke as yourself. Red velvet is off this week’s list. Assistant stays paused here until you unmute.</p>
      </div>`;
    }
    if (c.repaired && !c.catalogFixed) {
      return html`<div class="suggest err" style="margin:.5rem 1rem">
        <strong>Customer has your correction. Prevent the repeat.</strong>
        <p style="margin:.3rem 0">It offered red velvet because the list still says this week. Take it off before you unmute.</p>
        <button class="btn danger" data-act="fixlist">Take red velvet off this week’s list</button>
      </div>`;
    }
    return html`<div class="suggest err" style="margin:.5rem 1rem">
      <strong>Already sent · this reads as a booking</strong>
      <p style="margin:.3rem 0">“Yes, red velvet is on this week’s list. 1 kg ₹850. You’re booked for 6pm pickup.”</p>
      <p class="preview" style="white-space:normal;max-width:none;margin:0 0 .45rem">Why: treated a stale list as true, then confirmed a slot. You did not send this. No second bot apology — pick an honest line below or type.</p>
      <div style="display:flex;gap:.35rem;flex-wrap:wrap">
        <button class="btn warn" data-act="takeover">Take over</button>
        <button class="btn ghost" data-act="view" data-v="catalog">Open the list</button>
      </div>
    </div>`;
  }

  function renderMsg(m) {
    if (m.kind === "sys") return `<div class="bubble-wrap" style="align-self:center;max-width:90%"><div class="bubble sys">${esc(m.text)}</div></div>`;
    const side = m.from === "c" ? "in" : "out";
    const who =
      m.kind === "draft"
        ? `<div class="who draft">AI draft · not sent</div>`
        : m.wrong
          ? `<div class="who wrong">Assistant sent · this is wrong</div>`
        : m.kind === "ai"
          ? `<div class="who">Assistant sent</div>`
          : m.kind === "you"
            ? `<div class="who you">You</div>`
            : "";
    const cards = m.cards
      ? `<div class="cards">${m.cards
          .map(
            (p) =>
              `<button class="pcard" data-act="pick" data-id="${p.id}"><div class="swatch ${p.id}"></div><div class="body"><strong>${esc(p.title)}</strong><span class="preview">${esc(p.sub)}</span></div></button>`
          )
          .join("")}</div>`
      : "";
    return html`<div class="bubble-wrap ${side}">
      <div class="bubble ${m.kind === "draft" ? "draft" : ""} ${m.wrong ? "wrong" : ""}">
        ${who}
        ${esc(m.text).replace(/\n/g, "<br>")}
        ${cards}
        <div class="time">${esc(m.time)}${m.kind === "draft" ? " · not sent" : m.from !== "c" && m.sent ? " · sent" : ""}</div>
      </div>
    </div>`;
  }

  function renderInfo() {
    const c = state.chats[state.selected];
    if (!c) return "";
    return html`<aside class="info">
      <div class="info-top">
        <h3 style="margin:0">Details</h3>
        <button class="btn ghost" data-act="toggleinfo">Close</button>
      </div>
      <h3>Customer</h3>
      <div class="block">
        <p><strong>${esc(c.name)}</strong></p>
        <p>WhatsApp · mock number hidden</p>
        <p>Label: home bakery customer</p>
        <p>Tags: ${esc((c.labels || []).join(" · ") || "none")}</p>
      </div>
      <h3>Order</h3>
      <div class="block"><p>${esc(c.order)}</p></div>
      <h3>History</h3>
      <div class="block"><p>${c.messages.length} messages in this thread. Mock WhatsApp only.</p></div>
      <h3>AI on this chat</h3>
      <div class="block">
        <p>Handler: ${c.handler === "owner" ? "You" : "Assistant"}</p>
        <p>Global AI: ${paused() ? "paused" : "on"}</p>
        <p class="preview" style="white-space:normal;max-width:none">Routine/catalog may send. Large / custom / complaint wait for you. No refund. Kitchen starts only after they confirm back.</p>
      </div>
      ${c.scenario === "s1-ok" ? `<div class="block"><p><strong>Scenario 1 — options worked</strong></p><p>She picked a listed design and a name. Confirmed. Forwarded.</p></div>` : ""}
      ${c.scenario === "s1-fail" ? `<div class="block"><p><strong>Scenario 1 — options didn’t work</strong></p><p>Not on the list. Hold sent. You’re needed.</p></div>` : ""}
      ${c.scenario === "sent-mistake" ? `<div class="block"><p><strong>Mistake — already sent</strong></p><p>Not a draft. She already has a yes. Correct as yourself, then fix the list so it cannot repeat.</p></div>` : ""}
    </aside>`;
  }

  function renderView() {
    const titles = { settings: "AI & business", ai: "AI rules", approvals: "Awaiting you", activity: "AI activity", catalog: "Menu & prices", hours: "Hours & calendar", profile: "Business profile" };
    return html`<div class="view">
      <div class="view-head">
        <button class="btn ghost" data-act="view" data-v="chats">‹ Chats</button>
        ${state.view !== "settings" ? `<button class="btn ghost" data-act="view" data-v="settings">AI & business</button>` : ""}
        <h1>${titles[state.view] || "Settings"}</h1>
      </div>
      <div class="view-body">${viewBody()}</div>
    </div>`;
  }

  function viewBody() {
    if (state.view === "settings") return settingsView();
    if (state.view === "ai") return aiView();
    if (state.view === "approvals") return approvalsView();
    if (state.view === "activity") return activityView();
    if (state.view === "catalog") return catalogView();
    if (state.view === "hours") return hoursView();
    if (state.view === "profile") return profileView();
    return `<div class="empty">This screen isn’t in the prototype.</div>`;
  }

  function settingsView() {
    const waiting = Object.values(state.chats).filter((c) => c.status === "awaiting").length;
    const need = Object.values(state.chats).filter((c) => c.status === "attention" || c.status === "promised").length;
    return html`
      <div class="state-banner ${paused() ? "err" : "ok"}">${paused() ? "Assistant is paused for every chat. Resume when you want it to collect again." : "Assistant is on. Routine and catalog may send. Large / custom / complaint wait for you."}</div>
      <div class="rule"><span>Disable immediately</span>
        <button class="btn ${paused() ? "main" : "warn"}" data-act="toggleai">${paused() ? "Resume AI" : "Pause AI now"}</button>
      </div>
      <div class="nav-cards">
        <button data-act="view" data-v="ai"><strong>AI rules & permissions</strong><span>Auto, ask me, or I speak — by conversation type</span></button>
        <button data-act="view" data-v="approvals"><strong>Approval queue</strong><span>${waiting ? waiting + " draft(s) waiting" : "Nothing waiting"}</span></button>
        <button data-act="view" data-v="activity"><strong>AI activity</strong><span>What it sent, held, or asked you</span></button>
        <button data-act="view" data-v="catalog"><strong>Menu & prices</strong><span>This week’s list the assistant may show</span></button>
        <button data-act="view" data-v="hours"><strong>Hours & calendar</strong><span>What it may repeat about capacity</span></button>
        <button data-act="view" data-v="profile"><strong>Business profile</strong><span>Story, kitchen, from-scratch USP</span></button>
      </div>
      ${need ? `<div class="state-banner err">${need} conversation(s) need you — custom, complaint, or a rejected draft.</div>` : `<div class="state-banner load">No errors. Empty queues stay empty until a customer writes.</div>`}
    `;
  }

  function aiView() {
    const r = state.rules;
    const opt = (key, val, lab) =>
      `<label class="toggle"><input type="radio" name="${key}" value="${val}" ${r[key] === val ? "checked" : ""} data-act="rule" data-k="${key}" data-v="${val}"> ${lab}</label>`;
    return html`
      <p class="preview" style="white-space:normal;max-width:none">From the owner interviews: collect routine if she allows it. Don’t confirm custom, final price, or a complaint resolution. Don’t start the kitchen on a maybe.</p>
      <div class="rule"><span>Assistant for everyone</span>
        <button class="btn ${paused() ? "main" : "warn"}" data-act="toggleai">${paused() ? "Resume" : "Pause now"}</button>
      </div>
      <h3>Conversation types</h3>
      <div class="rule"><div>Listed flavours, egg/eggless, catalog browse, name on cake<br><span class="preview">Scenario 1 — no custom design</span></div><div>${opt("catalog", "auto", "Auto")} ${opt("catalog", "approve", "Ask me")} ${opt("catalog", "off", "I speak")}</div></div>
      <div class="rule"><div>Large number + date (40 cupcakes Saturday)</div><div>${opt("large", "approve", "Ask me")} ${opt("large", "auto", "Auto")} ${opt("large", "off", "I speak")}</div></div>
      <div class="rule"><div>Photo / reference / intricate / “kuch bhi”</div><div>${opt("custom", "hold", "Hold + me")} ${opt("custom", "off", "Silent + me")}</div></div>
      <div class="rule"><div>Late, disappointed, refund</div><div>${opt("complaint", "escalate", "Hold + me")} ${opt("complaint", "off", "Silent + me")}</div></div>
      <h3>Boundaries — never without you</h3>
      <div class="toggle"><input type="checkbox" checked disabled> Refund, compensation, remake</div>
      <div class="toggle"><input type="checkbox" checked disabled> “You’re booked” / start kitchen</div>
      <div class="toggle"><input type="checkbox" checked disabled> Invent a design that isn’t on the list</div>
      <div class="toggle"><input type="checkbox" checked disabled> Final price on custom or large dated work</div>
      <p><button class="btn ghost" data-act="view" data-v="catalog">Edit catalog</button>
      <button class="btn ghost" data-act="view" data-v="hours">Hours & calendar</button>
      <button class="btn ghost" data-act="view" data-v="profile">Business profile</button></p>
    `;
  }

  function approvalsView() {
    const waiting = Object.entries(state.chats).filter(([, c]) => c.status === "awaiting");
    if (!waiting.length) return `<div class="empty">Nothing waiting. New commitments will land here.</div>`;
    return waiting
      .map(
        ([id, c]) => html`<div class="block" style="background:var(--panel);padding:0.8rem;border-radius:8px;margin-bottom:0.6rem">
          <strong>${esc(c.name)}</strong>
          <p>${esc(c.order)}</p>
          <button class="btn main" data-act="open" data-id="${id}">Open draft</button>
        </div>`
      )
      .join("");
  }

  function activityView() {
    if (!state.activity.length) return `<div class="empty">No activity yet.</div>`;
    return state.activity
      .map((a) => `<div class="rule"><span>${esc(a.text)}</span><span class="preview">${esc(a.t)}</span></div>`)
      .join("");
  }

  function catalogView() {
    return (
      state.catalog
        .map(
          (p) => html`<div class="rule">
            <div><strong>${esc(p.name)}</strong><div class="preview">₹${p.kg}/kg · ${p.avail ? "On this week’s list" : "Off list — AI must not offer"}</div><div class="preview">${esc(p.note)}</div></div>
            <div>
              <button class="btn ghost" data-act="togcat" data-id="${p.id}">${p.avail ? "Take off list" : "Put on list"}</button>
            </div>
          </div>`
        )
        .join("") + `<p class="preview">Photo cake stays off auto-confirm even if you put it on the list.</p>`
    );
  }

  function hoursView() {
    return html`<label class="field"><span>Hours (AI may repeat this)</span><textarea id="hours">${esc(state.hours)}</textarea></label>
      <label class="field"><span>Saturday</span><input id="cal-sat" value="${esc(state.calendar.Saturday)}" /></label>
      <label class="field"><span>Tomorrow</span><input id="cal-tom" value="${esc(state.calendar.Tomorrow)}" /></label>
      <button class="btn main" data-act="savehours">Save for the assistant</button>`;
  }

  function profileView() {
    return html`<div class="block" style="background:var(--panel);padding:1rem;border-radius:8px">
      <p><strong>Lakshmi’s Cakes</strong> · home bakery</p>
      <p>From scratch, primarily eggless. Pickup from home. Digital bill. Pay on receipt (GPay) — AI does not chase payment.</p>
      <p>Story she allows: home baker, every cake to order, fresh ingredients. Kitchen photos: AI may say the kitchen is a clean home kitchen; it must not invent hygiene certificates.</p>
    </div>
    <p class="preview">This is mock business information the assistant can use on Scenario 1 chats.</p>`;
  }

  function quickFor(c) {
    if (c.scenario === "sent-mistake" && !c.repaired) {
      return [
        "Red velvet isn’t on this week’s list — I need to correct that. Chocolate or rosette I can still do today.",
        "That “booked” was a mistake. I haven’t started. Tell me if you still want something from today’s list.",
        "I’ll call you in five minutes.",
      ];
    }
    if (c.handler === "owner") {
      if (c.scenario === "complaint") return ["I’ll call you shortly", "Delay was on us — I’ll make this right (no refund yet)", "It left on time — checking delivery"];
      if (c.scenario === "custom") return ["I can do it — send the photo", "I can’t take tomorrow — I’ll be honest"];
      if (c.scenario === "sent-mistake") return ["Chocolate is on today’s list if that helps", "Sunday is free if you can wait"];
      return ["I’ll confirm shortly", "Please send the photo"];
    }
    return ["I’ll take this from here"];
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function bind() {
    document.querySelectorAll("[data-act]").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        act(el.dataset.act, el.dataset);
      });
    });
    const s = document.getElementById("search");
    if (s)
      s.addEventListener("input", () => {
        state.search = s.value;
        state.filter = state.filter;
        const keep = s.selectionStart;
        render();
        const n = document.getElementById("search");
        if (n) {
          n.focus();
          n.setSelectionRange(keep, keep);
        }
      });
    const ta = document.getElementById("composer");
    if (ta)
      ta.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendOwner(ta.value);
        }
      });
  }

  function act(name, d) {
    const c = state.chats[state.selected];
    if (name === "filter") state.filter = d.id;
    if (name === "view") {
      state.view = d.v;
      if (d.v === "chats") state.view = "chats";
    }
    if (name === "open") {
      state.selected = d.id;
      state.chats[d.id].unread = 0;
      state.view = "chats";
      state.mobileChat = true;
    }
    if (name === "back") state.mobileChat = false;
    if (name === "toggleinfo") state.showInfo = !state.showInfo;
    if (name === "toggleai") {
      state.aiGlobal = paused() ? "on" : "paused";
      log(state.aiGlobal === "paused" ? "You paused the assistant for everyone." : "You resumed the assistant.");
      toast(state.aiGlobal === "paused" ? "AI paused" : "AI on");
    }
    if (name === "takeover" && c) takeover(c);
    if (name === "resolve" && c) {
      c.status = "resolved";
      c.messages.push(msg("sys", "You marked this conversation resolved. AI stays muted here until you unmute.", { time: nowTime() }));
      log(`Resolved ${c.name}.`);
      toast("Marked resolved");
    }
    if (name === "resume" && c) {
      const velvet = state.catalog.find((x) => x.id === "velvet");
      if (c.scenario === "sent-mistake" && velvet && velvet.avail) {
        toast("Take red velvet off the list first — or it may offer it again.");
      }
      c.handler = "ai";
      c.pausedHere = false;
      if (c.status === "owner") c.status = c.messages.some((m) => m.kind === "draft" && !m.sent) ? "awaiting" : "waiting";
      c.messages.push(msg("sys", "AI may reply again on allowed topics in this chat.", { time: nowTime() }));
      log(`AI unmuted on ${c.name}.`);
    }
    if (name === "fixlist") {
      const p = state.catalog.find((x) => x.id === "velvet");
      if (p) p.avail = false;
      if (c) {
        c.catalogFixed = true;
        if (c.scenario === "sent-mistake") {
          c.order = "1 kg red velvet · you corrected the false booking. Kitchen has not started. Red velvet is off this week’s list.";
        }
        c.messages.push(
          msg("sys", "Red velvet taken off this week’s list. Assistant will not offer it on the next chat.", { time: nowTime() })
        );
      }
      log("You corrected the list after a wrong send. Red velvet is off.");
      toast("List updated — it won’t offer red velvet next");
    }
    if (name === "send") {
      const ta = document.getElementById("composer");
      const val = ta ? ta.value : "";
      if (!String(val).trim()) {
        toast("Type a message first");
        render();
        return;
      }
      sendOwner(val);
      return;
    }
    if (name === "quick") sendOwner(d.t);
    if (name === "attach") toast("Attachments are mock in this prototype.");
    if (name === "approve") approveDraft();
    if (name === "reject") rejectDraft();
    if (name === "editdraft") {
      const dft = lastDraft();
      if (dft) state.modal = { title: "Edit before sending", value: dft.text, kind: "draft" };
    }
    if (name === "closemodal") state.modal = null;
    if (name === "modalsave") {
      const t = document.getElementById("modal-text");
      if (t && lastDraft()) {
        lastDraft().text = t.value;
        approveDraft();
      }
      state.modal = null;
    }
    if (name === "pick") toast("She already chose in this thread. New picks would start a fresh catalog send.");
    if (name === "rule") {
      state.rules[d.k] = d.v;
      log(`Rule ${d.k} → ${d.v}`);
      toast("Rule saved");
    }
    if (name === "togcat") {
      const p = state.catalog.find((x) => x.id === d.id);
      if (p) {
        p.avail = !p.avail;
        log(`${p.name} ${p.avail ? "on" : "off"} this week’s list.`);
        toast("Catalog updated — assistant will use this next");
      }
    }
    if (name === "savehours") {
      const h = document.getElementById("hours");
      const sat = document.getElementById("cal-sat");
      const tom = document.getElementById("cal-tom");
      if (h) state.hours = h.value;
      if (sat) state.calendar.Saturday = sat.value;
      if (tom) state.calendar.Tomorrow = tom.value;
      log("Hours and calendar saved for the assistant.");
      toast("Saved");
    }
    render();
  }

  function lastDraft() {
    const c = state.chats[state.selected];
    return c ? [...c.messages].reverse().find((m) => m.kind === "draft" && !m.sent) : null;
  }

  function approveDraft() {
    const c = state.chats[state.selected];
    const dft = lastDraft();
    if (!c || !dft) return;
    if (c.scenario === "mistake") {
      toast("This draft is a booking. Reject it — don’t send a yes she wouldn’t send.");
      return;
    }
    dft.sent = true;
    dft.kind = "you";
    dft.time = nowTime();
    c.status = "waiting";
    c.preview = dft.text.slice(0, 48);
    if (c.scenario === "large") c.order = "40 cupcakes Sat 4pm pickup · vanilla 24 / chocolate 16 · you sent the price. Not a bake until they confirm back.";
    c.messages.push(msg("sys", "You sent this as Lakshmi. It is still not a bake until they confirm back.", { time: nowTime() }));
    log(`You approved a send to ${c.name}.`);
    toast("Sent as you");
  }

  function rejectDraft() {
    const c = state.chats[state.selected];
    const dft = lastDraft();
    if (!c || !dft) return;
    dft.kind = "sys";
    dft.sent = true;
    dft.text = "Draft rejected. It was not sent.";
    if (c.scenario === "mistake") {
      c.messages.push(
        msg("sys", "Rule reminded: photo / rush / custom stays on hold. Assistant will not send a yes.", { time: nowTime() })
      );
      state.rules.custom = "hold";
      c.status = "attention";
      c.preview = "Draft rejected — hold instead";
      c.messages.push(msg("ai", HOLD_CUSTOM, { time: nowTime() }));
      log("You rejected a wrong yes. Custom stays hold. Hold copy sent.");
      toast("Rejected. Hold sent instead.");
    } else {
      c.status = "attention";
      c.preview = "Draft rejected";
      log(`You rejected a draft to ${c.name}.`);
      toast("Rejected — not sent");
    }
  }

  function takeover(c) {
    c.handler = "owner";
    c.status = "owner";
    c.pausedHere = true;
    c.messages.push(msg("sys", "You took over. The assistant will not reply in this chat until you unmute.", { time: nowTime() }));
    log(`You took over ${c.name}.`);
    toast("You’re speaking");
  }

  function sendOwner(text) {
    const c = state.chats[state.selected];
    text = (text || "").trim();
    if (!c || !text) return;
    if (c.handler !== "owner") takeover(c);
    c.messages.push(msg("you", text, { time: nowTime() }));
    c.preview = text.slice(0, 48);
    c.time = nowTime();
    if (c.scenario === "sent-mistake" && !c.repaired) {
      c.repaired = true;
      c.order = "1 kg red velvet · you corrected the false booking. Kitchen has not started. List still needs the fix if red velvet is on it.";
      c.messages.push(msg("sys", "You sent the correction as Lakshmi. No second bot apology. Now stop the repeat — take red velvet off this week’s list.", { time: nowTime() }));
      log(`You corrected the wrong send to ${c.name}.`);
    } else {
      log(`You wrote to ${c.name}.`);
    }
    render();
  }

  render();
})();
