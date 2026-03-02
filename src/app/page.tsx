"use client";
export const dynamic = "force-static";
import { useState, useEffect, useRef, CSSProperties } from "react";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

interface CypherFeature {
  icon: string;
  title: string;
  short: string;
  desc: string;
  detail: string;
}

interface CypherStep {
  s: string;
  t: string;
  d: string;
}

interface ElementsCategory {
  name: string;
  count: number;
  nodes: string[];
}

interface PipelineNode {
  icon: string;
  label: string;
  c: string;
}

interface ExampleSystem {
  title: string;
  desc: string;
  nodes: PipelineNode[];
  sdk: string;
  tags: string[];
}

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const CYPHER_FEATURES: CypherFeature[] = [
  { icon: "⚡", title: "Multi-Language Execution", short: "Python, JS, Java, C++.", desc: "Write and run code in four languages directly in the browser. Each run returns actual output, error traces, and per-test timing — so you know exactly what passed, what failed, and why.", detail: "You can add custom test cases beyond the defaults, run them in batch, and see memory and time metrics for each one individually. Useful for catching edge cases before submitting." },
  { icon: "◈", title: "CodePlay — AI Analysis", short: "Break down any solution.", desc: "Give it a problem statement and your code. It returns a structured analysis: what algorithm you used, which data structures are involved, a step-by-step walkthrough of the logic, edge cases to watch for, and suggestions for improvement.", detail: "Each step includes visual aids — tables showing variable states, charts comparing time/space complexity across approaches, and highlighted code segments tied to each explanation phase." },
  { icon: "↺", title: "Code Rewind — Execution Tracer", short: "Watch your code run.", desc: "Traces through your code one line at a time, showing you the exact state of every variable at each step. You can see when functions get called, when they return, and the moment an exception is thrown.", detail: "Includes playback controls — play, pause, adjust speed, skip to key moments. You can pin specific variables to always stay visible, jump between chapters (logical sections of execution), and get an AI-generated explanation of what each step is doing." },
  { icon: "△", title: "Points & Rankings", short: "Track your progress.", desc: "Solving problems earns points based on difficulty — easy, medium, and hard each have different values. Solving several problems in a row builds a streak which adds bonus points. Solving on the first attempt gives an extra bonus too.", detail: "There's a leaderboard that updates in real-time showing rank, total points, solve count by difficulty, current streak, and trend (whether you're climbing or slipping). You can also see your percentile relative to all users." },
  { icon: "□", title: "Beginner Learning Path", short: "Guided from the start.", desc: "A separate set of 100+ problems designed for people learning to code. Each one comes with starter code in every supported language, hints that guide you without giving away the solution, and a clear explanation of the concept being taught.", detail: "Topics covered include recursion, sorting algorithms, tree traversal, graph basics, dynamic programming, divide and conquer, string manipulation, and more. Each problem has expected output, constraints, and worked examples." },
  { icon: "◇", title: "Community & Missions", short: "Discuss and challenge.", desc: "A discussion space where users can share their approaches to problems, post code with syntax highlighting and spoiler tags, and vote on helpful explanations. There are also daily and weekly missions — structured mini-challenges with their own rewards.", detail: "Missions vary in type: some are speed-based (solve X problems in Y time), some are optimization-focused (find a solution under a certain complexity), and some are exploratory (solve using a language you haven't used before)." },
];

const CYPHER_WORKFLOW: CypherStep[] = [
  { s: "01", t: "Browse Problems", d: "200+ problems organized by topic (arrays, trees, graphs, DP, etc.) and difficulty. Each problem page shows the description, constraints, examples, and your past submissions if any." },
  { s: "02", t: "Write & Run Code", d: "A code editor with syntax highlighting and auto-completion. Choose your language, write your solution, and run it against the test cases. You see the actual output for each test — pass or fail, with the expected vs. received values." },
  { s: "03", t: "Analyze With AI", d: "Two tools: CodePlay gives you a written breakdown of the algorithm and approach. Code Rewind lets you step through the execution visually, line by line, watching variables change." },
  { s: "04", t: "Track Progress", d: "Each successful submission earns points. Your dashboard shows which problems you've solved, your current streak, rank on the leaderboard, and how you compare across different topics." },
];

const ELEMENTS_CATEGORIES: ElementsCategory[] = [
  { name: "I/O", count: 5, nodes: ["Text Input", "Output", "Webhook Trigger", "Schedule Trigger", "Manual Trigger"] },
  { name: "Processing", count: 10, nodes: ["Text Cleaner", "Text Splitter", "Text Merger", "Regex Extractor", "Template Engine", "JSON Parser", "Text Sanitizer", "Text Formatter", "Translator", "Deduplicator"] },
  { name: "AI Models", count: 7, nodes: ["LLM (Multi-Provider)", "Embedding", "Image Generation", "Speech to Text", "Text to Speech", "Vector Store", "RAG (9 Modes)"] },
  { name: "Analysis", count: 8, nodes: ["Sentiment Analysis", "Summarizer", "Keyword Extractor", "Text Classifier", "Language Detector", "Data Enricher", "RAG Evaluator", "Advanced Eval"] },
  { name: "Integrations", count: 3, nodes: ["HTTP Request", "Web Scraper", "Webhook Response"] },
  { name: "Flow Control", count: 6, nodes: ["IF / Condition", "Delay / Wait", "Loop / Iterator", "Switch", "Router", "Aggregator"] },
  { name: "Data", count: 7, nodes: ["Data Store", "Code Executor", "Hash", "Base64", "CSV Parser", "Math Eval", "Validator"] },
  { name: "Agents", count: 3, nodes: ["AI Agent", "Chain of Thought", "Prompt Chain"] },
  { name: "GPU Compute", count: 4, nodes: ["GPU Tensor Op", "GPU Batch Processor", "GPU Model Inference", "GPU Compute"] },
];

const EXAMPLE_SYSTEMS: ExampleSystem[] = [
  {
    title: "Smart Support Bot",
    desc: "Takes incoming support messages, detects sentiment and urgency, pulls answers from your knowledge base using RAG, and generates a personalized response. Negative sentiment triggers a different path with priority handling.",
    nodes: [
      { icon: "◈", label: "Webhook", c: "#2ad4e8" },
      { icon: "⚙", label: "Cleaner", c: "#a78bfa" },
      { icon: "◉", label: "Sentiment", c: "#eab308" },
      { icon: "⑂", label: "Condition", c: "#eab308" },
      { icon: "✦", label: "RAG", c: "#f43f5e" },
      { icon: "OUT", label: "Response", c: "#10b981" },
    ],
    sdk: `result = client.deploy.run("support-bot", {
    "text": "I can't log into my account"
})
print(result["output"])
# → "I understand how frustrating that must be.
#    Let me help you regain access..."`,
    tags: ["RAG", "Sentiment", "LLM"],
  },
  {
    title: "Document Q&A",
    desc: "Upload any document — PDFs, reports, manuals. It splits the content into chunks, generates embeddings, stores them in a vector database, and lets you ask questions in natural language. Answers come back grounded in the actual document with source citations.",
    nodes: [
      { icon: "◈", label: "Input", c: "#2ad4e8" },
      { icon: "⚙", label: "Splitter", c: "#a78bfa" },
      { icon: "✦", label: "Embedding", c: "#f43f5e" },
      { icon: "▤", label: "VectorDB", c: "#10b981" },
      { icon: "✦", label: "RAG Q&A", c: "#f43f5e" },
      { icon: "OUT", label: "Answer", c: "#10b981" },
    ],
    sdk: `result = client.deploy.run("doc-qa", {
    "text": "What are the return policy terms?"
})
print(result["output"])
# → "Per Section 4.2, returns are accepted
#    within 30 days of purchase..."`,
    tags: ["RAG", "Embeddings", "Vector Store"],
  },
  {
    title: "Batch Translation",
    desc: "Feed it a batch of articles or product descriptions. A loop iterates through each one — detects the source language, translates to your target language, runs quality validation, and formats the output. Handles 50+ documents in one run.",
    nodes: [
      { icon: "◈", label: "Input", c: "#2ad4e8" },
      { icon: "↻", label: "Loop", c: "#d946ef" },
      { icon: "◉", label: "Detect", c: "#eab308" },
      { icon: "⚙", label: "Translate", c: "#a78bfa" },
      { icon: "✅", label: "Validate", c: "#10b981" },
      { icon: "OUT", label: "Output", c: "#10b981" },
    ],
    sdk: `result = client.deploy.run("batch-translate", {
    "text": "Bonjour le monde\\nHallo Welt",
    "target_language": "english"
})
for item in result["translations"]:
    print(f"{item['source']} → {item['translated']}")`,
    tags: ["Loop", "Translation", "Batch"],
  },
  {
    title: "AI Research Agent",
    desc: "Give it a research topic. The agent node autonomously scrapes relevant pages, applies chain-of-thought reasoning to evaluate sources, extracts key findings, and compiles everything into a structured report — stored and retrievable later.",
    nodes: [
      { icon: "◈", label: "Topic", c: "#2ad4e8" },
      { icon: "◆", label: "Agent", c: "#f43f5e" },
      { icon: "⬡", label: "Scraper", c: "#0891b2" },
      { icon: "◆", label: "CoT", c: "#f43f5e" },
      { icon: "≡", label: "Summary", c: "#a78bfa" },
      { icon: "OUT", label: "Report", c: "#10b981" },
    ],
    sdk: `result = client.deploy.run("research-agent", {
    "text": "Latest developments in federated learning"
})
print(result["output"])
# → { "summary": "...", "sources": [...],
#     "key_findings": [...] }`,
    tags: ["Agent", "Chain of Thought", "Scraper"],
  },
  {
    title: "Content Moderator",
    desc: "Incoming user content gets sanitized, analyzed for sentiment, classified into risk categories, and routed accordingly. Clean content passes through instantly. Flagged content goes to a review queue with classification details attached.",
    nodes: [
      { icon: "⬡", label: "Webhook", c: "#0891b2" },
      { icon: "⚙", label: "Sanitize", c: "#a78bfa" },
      { icon: "◉", label: "Classify", c: "#eab308" },
      { icon: "⑂", label: "Router", c: "#d946ef" },
      { icon: "✦", label: "Review", c: "#f43f5e" },
      { icon: "OUT", label: "Result", c: "#10b981" },
    ],
    sdk: `result = client.deploy.run("content-mod", {
    "text": user_message
})
if result["flagged"]:
    queue_for_review(result["category"])
else:
    publish(result["cleaned_text"])`,
    tags: ["Safety", "Classifier", "Router"],
  },
  {
    title: "Scheduled Data Collector",
    desc: "Runs on a schedule — every hour, daily, whatever you set. Fetches data from an external API, parses the JSON response, validates data quality, enriches it with additional context, and stores the result. Full history of every run.",
    nodes: [
      { icon: "⏰", label: "Schedule", c: "#2ad4e8" },
      { icon: "⬡", label: "HTTP", c: "#0891b2" },
      { icon: "⚙", label: "JSON Parse", c: "#a78bfa" },
      { icon: "✅", label: "Validate", c: "#10b981" },
      { icon: "◉", label: "Enrich", c: "#eab308" },
      { icon: "▤", label: "Store", c: "#10b981" },
    ],
    sdk: `# Trigger manually via SDK (normally on schedule)
result = client.deploy.run("data-collector", {
    "text": "manual-trigger"
})
print(f"Collected {result['records_count']} records")
print(f"Quality: {result['quality_score']}% clean")`,
    tags: ["Schedule", "HTTP", "Validation"],
  },
];

/* ═══════════════════════════════════════════════════════════
   BACKGROUND
   ═══════════════════════════════════════════════════════════ */
function GridBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let t = 0;

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      r: number; o: number; pulse: number;
    }
    const particles: Particle[] = [];
    let w: number, h: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const PARTICLE_COUNT = 120;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * 3000, y: Math.random() * 3000,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.5, o: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const CONNECT_DIST = 160;

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, w, h);

      const ax1 = w * 0.3 + Math.sin(t * 0.7) * w * 0.15;
      const ay1 = h * 0.2 + Math.cos(t * 0.5) * h * 0.1;
      const ax2 = w * 0.7 + Math.cos(t * 0.6) * w * 0.15;
      const ay2 = h * 0.35 + Math.sin(t * 0.8) * h * 0.12;
      const ax3 = w * 0.5 + Math.sin(t * 0.4) * w * 0.2;
      const ay3 = h * 0.7 + Math.cos(t * 0.3) * h * 0.1;

      const a1 = ctx.createRadialGradient(ax1, ay1, 0, ax1, ay1, w * 0.4);
      a1.addColorStop(0, `rgba(16,185,129,${0.04 + Math.sin(t * 1.2) * 0.015})`);
      a1.addColorStop(0.5, `rgba(16,185,129,${0.015 + Math.sin(t) * 0.008})`);
      a1.addColorStop(1, "transparent");
      ctx.fillStyle = a1;
      ctx.fillRect(0, 0, w, h);

      const a2 = ctx.createRadialGradient(ax2, ay2, 0, ax2, ay2, w * 0.35);
      a2.addColorStop(0, `rgba(6,182,212,${0.025 + Math.cos(t * 0.9) * 0.01})`);
      a2.addColorStop(0.6, `rgba(6,182,212,${0.008 + Math.sin(t * 1.1) * 0.005})`);
      a2.addColorStop(1, "transparent");
      ctx.fillStyle = a2;
      ctx.fillRect(0, 0, w, h);

      const a3 = ctx.createRadialGradient(ax3, ay3, 0, ax3, ay3, w * 0.3);
      a3.addColorStop(0, `rgba(16,185,129,${0.02 + Math.sin(t * 0.6) * 0.01})`);
      a3.addColorStop(1, "transparent");
      ctx.fillStyle = a3;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(16,185,129,0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = 50;
      for (let x = 0; x < w; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      ctx.strokeStyle = "rgba(16,185,129,0.055)";
      const lgGrid = 250;
      for (let x = 0; x < w; x += lgGrid) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += lgGrid) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        const flicker = p.o + Math.sin(p.pulse) * 0.12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${Math.max(0.05, flicker)})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,185,129,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1, background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)" }} />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   DEMO MODAL
   ═══════════════════════════════════════════════════════════ */
function DemoModal({ open, onClose, product }: { open: boolean; onClose: () => void; product: string }) {
  if (!open) return null;
  const inputStyle: CSSProperties = { width: "100%", padding: "10px 14px", background: "var(--s0)", border: "1px solid var(--b0)", color: "var(--t1)", fontFamily: "var(--body)", fontSize: 13, outline: "none" };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(5,10,8,0.92)", backdropFilter: "blur(20px)" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 480, margin: "0 20px", padding: "40px 36px", background: "var(--s1)", border: "1px solid var(--b1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <p className="mono-label" style={{ color: "var(--accent)", marginBottom: 4 }}>REQUEST DEMO</p>
            <h3 style={{ fontFamily: "var(--heading)", fontSize: 22, color: "var(--t1)", fontWeight: 600 }}>{product || "Get in Touch"}</h3>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--b0)", background: "none", color: "var(--t3)", cursor: "pointer", fontSize: 14, fontFamily: "var(--mono)" }}>✕</button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {["Name", "Email", "Company (optional)", "Message"].map((f) => (
            <div key={f}>
              <label className="mono-label" style={{ display: "block", color: "var(--t3)", marginBottom: 5 }}>{f.toUpperCase()}</label>
              {f === "Message" ? (
                <textarea rows={3} placeholder="Tell me what interests you..." style={{ ...inputStyle, resize: "vertical" }} onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "var(--b0)"; }} />
              ) : (
                <input type={f === "Email" ? "email" : "text"} required={!f.includes("optional")} placeholder={f === "Email" ? "you@company.com" : ""} style={inputStyle} onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "var(--b0)"; }} />
              )}
            </div>
          ))}
          <button type="submit" className="primary-btn" style={{ marginTop: 8 }}>Submit Request</button>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CYPHER DETAIL PAGE
   ═══════════════════════════════════════════════════════════ */
function CypherDetail({ onBack, onDemo }: { onBack: () => void; onDemo: (p: string) => void }) {
  const [expandedFeat, setExpandedFeat] = useState<number | null>(null);
  return (
    <div className="detail-page fadeIn">
      <div className="detail-topbar">
        <button onClick={onBack} className="back-btn">← Back</button>
        <button onClick={() => onDemo("Cypher Platform")} className="outline-btn accent-border">Request Demo →</button>
      </div>

      {/* Hero */}
      <div style={{ marginBottom: 72 }}>
        <div className="product-label">
          <div className="glow-dot accent-glow" />
          <span className="mono-label" style={{ color: "var(--accent)" }}>PRODUCT_01</span>
        </div>
        <h1 className="detail-title">Cypher<span style={{ color: "var(--accent)" }}>.</span></h1>
        <p className="detail-subtitle">A coding platform where you can solve problems, run your code, and actually understand how it works — whether you&apos;re just starting out or preparing for interviews.</p>
      </div>

      {/* Vision block */}
      <div className="panel-dark" style={{ marginBottom: 72, padding: "32px 36px" }}>
        <p className="mono-label" style={{ color: "var(--t4)", marginBottom: 16 }}>WHY THIS EXISTS</p>
        <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.8, maxWidth: 640 }}>
          I wanted a place where solving a problem isn&apos;t just about getting the right answer — it&apos;s about understanding why the answer works.
          That&apos;s why Cypher has AI tools built in: not to solve things for you, but to <span style={{ color: "var(--accent)" }}>help you see what your code is actually doing</span>, step by step.
        </p>
      </div>

      {/* How It Works */}
      <div style={{ marginBottom: 72 }}>
        <p className="mono-label section-label">HOW_IT_WORKS</p>
        <div className="grid-2">
          {/* Code mock */}
          <div className="panel-dark">
            <div className="window-chrome">
              <div className="wdot" style={{ background: "var(--red)" }} /><div className="wdot" style={{ background: "var(--yellow)" }} /><div className="wdot" style={{ background: "var(--accent)" }} />
              <span className="window-title">solution.py</span>
            </div>
            <div style={{ marginTop: 16 }}>
              {([
                { n: 1, i: 0, t: [["def ", "var(--accent)"], ["two_sum", "var(--t1)"], ["(nums, target):", "var(--t3)"]] },
                { n: 2, i: 1, t: [["seen ", "var(--t2)"], ["= ", "var(--t3)"], ["{}", "var(--yellow)"]] },
                { n: 3, i: 1, t: [["for ", "var(--accent)"], ["i, n ", "var(--t1)"], ["in ", "var(--accent)"], ["enumerate", "var(--t2)"], ["(nums):", "var(--t3)"]] },
                { n: 4, i: 2, t: [["comp ", "var(--t2)"], ["= target - n", "var(--t3)"]] },
                { n: 5, i: 2, t: [["if ", "var(--accent)"], ["comp ", "var(--t2)"], ["in ", "var(--accent)"], ["seen:", "var(--t2)"]] },
                { n: 6, i: 3, t: [["return ", "var(--accent)"], ["[seen[comp], i]", "var(--yellow)"]] },
                { n: 7, i: 2, t: [["seen[n] ", "var(--t2)"], ["= i", "var(--yellow)"]] },
              ] as { n: number; i: number; t: string[][] }[]).map((line) => (
                <div key={line.n} className="code-row">
                  <span className="code-gutter">{line.n}</span>
                  <span style={{ paddingLeft: line.i * 20 }}>
                    {line.t.map(([text, color], j) => <span key={j} style={{ fontFamily: "var(--mono)", fontSize: 12, color }}>{text}</span>)}
                  </span>
                </div>
              ))}
            </div>
            <div className="console-block">
              <div className="console-header"><div className="glow-dot green-glow" style={{ width: 5, height: 5 }} /><span style={{ color: "var(--green)" }}>ALL TESTS PASSED</span></div>
              {["✓ Test 1 — PASSED  (4ms)", "✓ Test 2 — PASSED  (7ms)", "✓ Test 3 — PASSED  (3ms)", "── 3/3 passed · 14ms total"].map((t, i) => (
                <p key={i} style={{ fontFamily: "var(--mono)", fontSize: 11, color: i === 3 ? "var(--t3)" : "var(--green)", lineHeight: 1.9, opacity: i === 3 ? 0.6 : 0.85 }}>{t}</p>
              ))}
            </div>
          </div>
          {/* Steps */}
          <div>
            {CYPHER_WORKFLOW.map((s, i) => (
              <div key={i} className="step-row" style={{ borderBottom: i < 3 ? "1px solid var(--b0)" : "none" }}>
                <span className="step-num">{s.s}</span>
                <div>
                  <h4 className="step-title">{s.t}</h4>
                  <p className="step-desc">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ marginBottom: 72 }}>
        <p className="mono-label section-label">PLATFORM_FEATURES</p>
        <div className="grid-3">
          {CYPHER_FEATURES.map((f, i) => (
            <div key={i} className="feat-card" onClick={() => setExpandedFeat(expandedFeat === i ? null : i)} style={{ borderColor: expandedFeat === i ? "var(--b1)" : undefined }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 16, color: "var(--accent)" }}>{f.icon}</span>
                <span className="expand-icon" style={{ transform: expandedFeat === i ? "rotate(45deg)" : "none" }}>+</span>
              </div>
              <h4 className="feat-title">{f.title}</h4>
              <p className="feat-short">{f.short}</p>
              <div className="feat-expand" style={{ maxHeight: expandedFeat === i ? 300 : 0, opacity: expandedFeat === i ? 1 : 0, paddingTop: expandedFeat === i ? 12 : 0 }}>
                <p className="feat-desc">{f.desc}</p>
                <p className="feat-detail">{f.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screenshots */}
      <div style={{ marginBottom: 72 }}>
        <p className="mono-label section-label">SCREENSHOTS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Screenshot 1: Problem List */}
          <div className="screenshot-card">
            <div className="ss-label">Problem Explorer</div>
            <div className="ss-window">
              <div className="window-chrome" style={{ marginBottom: 16 }}>
                <div className="wdot" style={{ background: "var(--red)" }} /><div className="wdot" style={{ background: "var(--yellow)" }} /><div className="wdot" style={{ background: "var(--accent)" }} />
                <span className="window-title">cypher / problems</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 160, height: 32, background: "var(--s0)", border: "1px solid var(--b0)", display: "flex", alignItems: "center", padding: "0 12px" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t4)" }}>🔍 Search problems...</span>
                </div>
                {["All", "Easy", "Medium", "Hard"].map((d, i) => (
                  <div key={d} style={{ padding: "6px 14px", background: i === 0 ? "var(--accent-dim)" : "var(--s0)", border: `1px solid ${i === 0 ? "var(--accent)" : "var(--b0)"}`, fontFamily: "var(--mono)", fontSize: 10, color: i === 0 ? "var(--accent)" : "var(--t3)" }}>{d}</div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 80px 80px 60px", gap: 8, padding: "8px 12px", borderBottom: "1px solid var(--b0)", marginBottom: 2 }}>
                {["#", "Title", "Difficulty", "Topic", "Status"].map(h => (
                  <span key={h} style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</span>
                ))}
              </div>
              {[
                { id: "001", title: "Two Sum", diff: "Easy", diffC: "var(--accent)", topic: "Arrays", solved: true },
                { id: "002", title: "Valid Parentheses", diff: "Easy", diffC: "var(--accent)", topic: "Stacks", solved: true },
                { id: "003", title: "Merge Intervals", diff: "Medium", diffC: "var(--yellow)", topic: "Arrays", solved: false },
                { id: "004", title: "LRU Cache", diff: "Medium", diffC: "var(--yellow)", topic: "Design", solved: false },
                { id: "005", title: "Binary Tree Zigzag", diff: "Medium", diffC: "var(--yellow)", topic: "Trees", solved: false },
                { id: "006", title: "Word Ladder", diff: "Hard", diffC: "var(--red)", topic: "Graphs", solved: false },
                { id: "007", title: "Median of Two Arrays", diff: "Hard", diffC: "var(--red)", topic: "Binary Search", solved: false },
              ].map((p, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "40px 1fr 80px 80px 60px", gap: 8, padding: "10px 12px", borderBottom: "1px solid rgba(24,41,36,0.5)", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--t4)" }}>{p.id}</span>
                  <span style={{ fontSize: 13, color: "var(--t1)", fontWeight: 500 }}>{p.title}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: p.diffC }}>{p.diff}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>{p.topic}</span>
                  <span style={{ fontSize: 12 }}>{p.solved ? "✓" : "—"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot 2: Code Editor + AI Analysis */}
          <div className="screenshot-card">
            <div className="ss-label">Code Editor + AI Analysis</div>
            <div className="ss-window">
              <div className="window-chrome" style={{ marginBottom: 16 }}>
                <div className="wdot" style={{ background: "var(--red)" }} /><div className="wdot" style={{ background: "var(--yellow)" }} /><div className="wdot" style={{ background: "var(--accent)" }} />
                <span className="window-title">cypher / two-sum / solve</span>
              </div>
              <div className="grid-2" style={{ gap: 12 }}>
                <div style={{ background: "var(--s0)", border: "1px solid var(--b0)", padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["Python", "JS", "Java", "C++"].map((l, i) => (
                        <span key={l} style={{ padding: "3px 8px", fontFamily: "var(--mono)", fontSize: 9, color: i === 0 ? "var(--accent)" : "var(--t4)", background: i === 0 ? "var(--accent-dim)" : "transparent", border: `1px solid ${i === 0 ? "var(--accent)" : "var(--b0)"}` }}>{l}</span>
                      ))}
                    </div>
                  </div>
                  {["def two_sum(nums, target):", "    seen = {}", "    for i, n in enumerate(nums):", "        comp = target - n", "        if comp in seen:", "            return [seen[comp], i]", "        seen[n] = i"].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, height: 22 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t4)", width: 16, textAlign: "right" }}>{i + 1}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: i === 0 ? "var(--accent)" : i === 5 ? "var(--yellow)" : "var(--t2)" }}>{t}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <div style={{ padding: "5px 14px", background: "var(--accent)", fontFamily: "var(--mono)", fontSize: 9, color: "var(--bg)", fontWeight: 600 }}>▶ RUN</div>
                    <div style={{ padding: "5px 14px", background: "var(--accent-dim)", border: "1px solid var(--accent)", fontFamily: "var(--mono)", fontSize: 9, color: "var(--accent)" }}>SUBMIT</div>
                  </div>
                  <div style={{ marginTop: 10, padding: 10, background: "rgba(4,8,6,0.6)", border: "1px solid var(--b0)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 5, height: 5, background: "var(--accent)", borderRadius: "50%" }} />
                      <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--accent)" }}>3/3 PASSED</span>
                    </div>
                    {["✓ [2,7,11,15] t=9 → [0,1]  2ms", "✓ [3,2,4] t=6 → [1,2]  1ms", "✓ [3,3] t=6 → [0,1]  1ms"].map((r, i) => (
                      <p key={i} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", opacity: 0.7, lineHeight: 1.8 }}>{r}</p>
                    ))}
                  </div>
                </div>
                <div style={{ background: "var(--s0)", border: "1px solid var(--b0)", padding: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--accent)" }}>◈</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.1em" }}>CODEPLAY ANALYSIS</span>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", marginBottom: 4 }}>ALGORITHM</p>
                    <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>Hash Map Lookup — store seen values, check complement each iteration.</p>
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <p style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", marginBottom: 4 }}>COMPLEXITY</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <div style={{ padding: "4px 10px", background: "var(--accent-dim)", border: "1px solid rgba(16,185,129,0.15)" }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)" }}>O(n) time</span>
                      </div>
                      <div style={{ padding: "4px 10px", background: "var(--accent-dim)", border: "1px solid rgba(16,185,129,0.15)" }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--accent)" }}>O(n) space</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", marginBottom: 6 }}>WALKTHROUGH</p>
                    {["1. Init empty hash map", "2. Compute complement (target - n)", "3. Check if complement in map → return", "4. Store current number → continue"].map((s, i) => (
                      <p key={i} style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)", lineHeight: 1.9 }}>{s}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot 3: Code Rewind Tracer */}
          <div className="screenshot-card">
            <div className="ss-label">Code Rewind — Execution Tracer</div>
            <div className="ss-window">
              <div className="window-chrome" style={{ marginBottom: 16 }}>
                <div className="wdot" style={{ background: "var(--red)" }} /><div className="wdot" style={{ background: "var(--yellow)" }} /><div className="wdot" style={{ background: "var(--accent)" }} />
                <span className="window-title">cypher / rewind / two-sum</span>
              </div>
              <div className="grid-2" style={{ gap: 12 }}>
                <div style={{ background: "var(--s0)", border: "1px solid var(--b0)", padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>Step 4 / 12</span>
                    <div style={{ display: "flex", gap: 4 }}>
                      {["⏮", "◀", "▶", "⏭"].map((b, i) => (
                        <div key={i} style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--s2)", border: "1px solid var(--b0)", fontSize: 9, color: "var(--t3)" }}>{b}</div>
                      ))}
                    </div>
                  </div>
                  <div style={{ height: 3, background: "var(--b0)", marginBottom: 12, borderRadius: 2 }}>
                    <div style={{ height: "100%", width: "33%", background: "var(--accent)", borderRadius: 2 }} />
                  </div>
                  {["def two_sum(nums, target):", "    seen = {}", "    for i, n in enumerate(nums):", "        comp = target - n", "        if comp in seen:", "            return [seen[comp], i]", "        seen[n] = i"].map((t, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, height: 24, alignItems: "center", background: i === 3 ? "rgba(16,185,129,0.08)" : "transparent", borderLeft: i === 3 ? "2px solid var(--accent)" : "2px solid transparent", paddingLeft: 6 }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: i === 3 ? "var(--accent)" : "var(--t4)", width: 14, textAlign: "right" }}>{i + 1}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: i === 3 ? "var(--t1)" : "var(--t3)" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ background: "var(--s0)", border: "1px solid var(--b0)", padding: 14, flex: 1 }}>
                    <p style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", marginBottom: 8, letterSpacing: "0.1em" }}>VARIABLES</p>
                    {([["nums", "[2, 7, 11, 15]"], ["target", "9"], ["i", "0"], ["n", "2"], ["comp", "7"], ["seen", "{}"]] as string[][]).map(([v, val], i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid rgba(24,41,36,0.4)" }}>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--t3)" }}>{v}</span>
                        <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: i === 4 ? "var(--accent)" : "var(--t2)" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "var(--s0)", border: "1px solid var(--b0)", padding: 14 }}>
                    <p style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--accent)", marginBottom: 6, letterSpacing: "0.1em" }}>AI NARRATION</p>
                    <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>Computing complement: target (9) minus current number (2) = 7. Next step checks if 7 exists in the hash map.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot 4: Leaderboard + Dashboard */}
          <div className="screenshot-card">
            <div className="ss-label">Leaderboard &amp; Dashboard</div>
            <div className="ss-window">
              <div className="window-chrome" style={{ marginBottom: 16 }}>
                <div className="wdot" style={{ background: "var(--red)" }} /><div className="wdot" style={{ background: "var(--yellow)" }} /><div className="wdot" style={{ background: "var(--accent)" }} />
                <span className="window-title">cypher / dashboard</span>
              </div>
              <div className="grid-2" style={{ gap: 12 }}>
                <div style={{ background: "var(--s0)", border: "1px solid var(--b0)", padding: 14 }}>
                  <p style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", marginBottom: 10, letterSpacing: "0.1em" }}>RANKINGS</p>
                  {[
                    { r: 1, name: "algo_master", pts: "2,840", streak: "14🔥", hl: false },
                    { r: 2, name: "code_ninja", pts: "2,610", streak: "9🔥", hl: false },
                    { r: 3, name: "binary_witch", pts: "2,455", streak: "6🔥", hl: false },
                    { r: 4, name: "you", pts: "1,920", streak: "4🔥", hl: true },
                    { r: 5, name: "tree_walker", pts: "1,780", streak: "3🔥", hl: false },
                  ].map((u, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "24px 1fr 60px 40px", gap: 4, padding: "8px 4px", borderBottom: "1px solid rgba(24,41,36,0.4)", background: u.hl ? "rgba(16,185,129,0.06)" : "transparent", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: u.hl ? "var(--accent)" : "var(--t4)" }}>{u.r}</span>
                      <span style={{ fontSize: 12, color: u.hl ? "var(--accent)" : "var(--t1)", fontWeight: u.hl ? 600 : 400 }}>{u.name}</span>
                      <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t2)" }}>{u.pts}</span>
                      <span style={{ fontSize: 11 }}>{u.streak}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[{ l: "Solved", v: "64", c: "var(--accent)" }, { l: "Streak", v: "4d", c: "var(--yellow)" }, { l: "Points", v: "1,920", c: "var(--t1)" }, { l: "Rank", v: "#4", c: "var(--accent)" }].map((s, i) => (
                      <div key={i} style={{ padding: 10, background: "var(--s0)", border: "1px solid var(--b0)" }}>
                        <p style={{ fontFamily: "var(--mono)", fontSize: 8, color: "var(--t4)", marginBottom: 2 }}>{s.l}</p>
                        <p style={{ fontFamily: "var(--heading)", fontSize: 20, color: s.c, fontWeight: 700 }}>{s.v}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "var(--s0)", border: "1px solid var(--b0)", padding: 14, flex: 1 }}>
                    <p style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", marginBottom: 8, letterSpacing: "0.1em" }}>BY DIFFICULTY</p>
                    {[{ d: "Easy", s: 28, t: 80, c: "var(--accent)" }, { d: "Medium", s: 26, t: 90, c: "var(--yellow)" }, { d: "Hard", s: 10, t: 40, c: "var(--red)" }].map((b, i) => (
                      <div key={i} style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: b.c }}>{b.d}</span>
                          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>{b.s}/{b.t}</span>
                        </div>
                        <div style={{ height: 4, background: "var(--b0)", borderRadius: 2 }}>
                          <div style={{ height: "100%", width: `${(b.s / b.t) * 100}%`, background: b.c, borderRadius: 2 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cypher CTA */}
      <button onClick={() => onDemo("Cypher Platform")} className="primary-btn">Request a Demo →</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ELEMENTS HELPERS
   ═══════════════════════════════════════════════════════════ */
function PipelineDiagram({ nodes }: { nodes: PipelineNode[] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, overflowX: "auto", padding: "16px 0" }}>
      {nodes.map((n, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ padding: "8px 14px", background: "var(--s2)", border: `1px solid color-mix(in srgb, ${n.c} 25%, transparent)`, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap", flexShrink: 0 }}>
            <span style={{ fontSize: 12 }}>{n.icon}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: n.c }}>{n.label}</span>
          </div>
          {i < nodes.length - 1 && (
            <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div style={{ width: 12, height: 1, background: "var(--b1)" }} />
              <div style={{ width: 0, height: 0, borderTop: "3px solid transparent", borderBottom: "3px solid transparent", borderLeft: "4px solid var(--b1)" }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  const lang = label?.includes("cURL") ? "BASH" : label?.includes("JavaScript") ? "JS" : "PYTHON";
  return (
    <div style={{ background: "var(--s0)", border: "1px solid var(--b0)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", borderBottom: "1px solid var(--b0)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--accent)", letterSpacing: "0.1em" }}>{lang}</span>
          {label && <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)" }}>— {label}</span>}
        </div>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", letterSpacing: "0.1em" }}>SDK</span>
      </div>
      <pre style={{ padding: "14px 16px", margin: 0, fontFamily: "var(--mono)", fontSize: 11, color: "var(--t2)", lineHeight: 1.8, overflowX: "auto", whiteSpace: "pre" }}>{code}</pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ELEMENTS DETAIL PAGE
   ═══════════════════════════════════════════════════════════ */
function ElementsDetail({ onBack, onDemo }: { onBack: () => void; onDemo: (p: string) => void }) {
  const [openCat, setOpenCat] = useState<number | null>(null);
  const [activeSystem, setActiveSystem] = useState(0);
  return (
    <div className="detail-page fadeIn">
      <div className="detail-topbar">
        <button onClick={onBack} className="back-btn">← Back</button>
        <button onClick={() => onDemo("Elements")} className="outline-btn red-border">Request Demo →</button>
      </div>

      {/* Hero */}
      <div style={{ marginBottom: 72 }}>
        <div className="product-label"><div className="glow-dot red-glow" /><span className="mono-label" style={{ color: "var(--red)" }}>PRODUCT_02</span></div>
        <h1 className="detail-title">Elements<span style={{ color: "var(--red)" }}>.</span></h1>
        <p className="detail-subtitle">Build AI systems visually — then call them from anywhere. Drag nodes onto a canvas, connect them into a pipeline, run it, and deploy it as an API endpoint that your code can call with one line.</p>
      </div>

      <div className="panel-dark" style={{ marginBottom: 72, padding: "32px 36px" }}>
        <p className="mono-label" style={{ color: "var(--t4)", marginBottom: 16 }}>THE IDEA</p>
        <p style={{ fontSize: 16, color: "var(--t2)", lineHeight: 1.8, maxWidth: 640 }}>You shouldn&apos;t need to write glue code every time you want to chain an LLM with a database lookup and a sentiment check. Elements gives you <span style={{ color: "var(--red)" }}>54 nodes across 9 categories</span> — AI models, data processors, logic controls, GPU compute — that you wire together visually. When it works, deploy it. Now it&apos;s an API.</p>
      </div>

      {/* How it works — 3 step */}
      <div style={{ marginBottom: 72 }}>
        <p className="mono-label section-label">HOW_IT_WORKS</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[{ step: "01", title: "Build", desc: "Drag nodes onto a canvas. Connect them. Configure each one. You see the whole pipeline as a visual graph.", icon: "◈" },
            { step: "02", title: "Run", desc: "Hit execute. Each node runs in sequence — you watch results stream in real-time, node by node, with timing and output.", icon: "▶" },
            { step: "03", title: "Deploy", desc: "One click to turn your pipeline into a live API. Call it from Python, JavaScript, curl — or use the SDK.", icon: "⬡" }].map((s, i) => (
            <div key={i} className="panel-dark" style={{ textAlign: "center", padding: "32px 24px" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 28, color: "var(--red)", marginBottom: 12, opacity: 0.6 }}>{s.icon}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)" }}>{s.step}</span>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--t1)" }}>{s.title}</h4>
              </div>
              <p style={{ fontSize: 13, color: "var(--t3)", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ EXAMPLE SYSTEMS ═══ */}
      <div style={{ marginBottom: 72 }}>
        <p className="mono-label section-label">WHAT_YOU_CAN_BUILD</p>
        <p style={{ fontSize: 16, color: "var(--t2)", marginBottom: 32, maxWidth: 560, lineHeight: 1.8 }}>Each system below is a real pipeline — built visually, deployed as an API. Here&apos;s what they look like and how you&apos;d call them.</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 28 }}>
          {EXAMPLE_SYSTEMS.map((sys, i) => (
            <button key={i} onClick={() => setActiveSystem(i)} style={{ padding: "8px 16px", background: activeSystem === i ? "var(--red-dim)" : "var(--s0)", border: `1px solid ${activeSystem === i ? "rgba(244,63,94,0.4)" : "var(--b0)"}`, color: activeSystem === i ? "var(--red)" : "var(--t3)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.2s" }}>{sys.title}</button>
          ))}
        </div>

        {EXAMPLE_SYSTEMS.map((sys, i) => activeSystem === i ? (
          <div key={i} className="fadeIn" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="panel-dark" style={{ padding: "28px 32px" }}>
              <h3 style={{ fontFamily: "var(--heading)", fontSize: 20, fontWeight: 700, color: "var(--t1)", marginBottom: 14 }}>{sys.title}</h3>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.8, marginBottom: 16, maxWidth: 640 }}>{sys.desc}</p>
              <div style={{ display: "flex", gap: 6 }}>
                {sys.tags.map((t, j) => <span key={j} style={{ padding: "3px 10px", fontFamily: "var(--mono)", fontSize: 9, color: "var(--red)", background: "var(--red-dim)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{t}</span>)}
              </div>
            </div>
            <div style={{ background: "rgba(11,22,19,0.8)", border: "1px solid var(--b0)", padding: "12px 20px", backdropFilter: "blur(4px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)", letterSpacing: "0.1em" }}>PIPELINE</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--t4)" }}>{sys.nodes.length} nodes</span>
              </div>
              <PipelineDiagram nodes={sys.nodes} />
            </div>
            <CodeBlock code={sys.sdk} label="deploy.run" />
          </div>
        ) : null)}
      </div>

      {/* Nodes — compact */}
      <div style={{ marginBottom: 72 }}>
        <p className="mono-label section-label">54_NODES × 9_CATEGORIES</p>
        <p style={{ fontSize: 14, color: "var(--t3)", marginBottom: 20, maxWidth: 520 }}>These are the building blocks. Drag any of them onto the canvas.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {ELEMENTS_CATEGORIES.map((cat, i) => (
            <div key={i}>
              <div className="cat-row" onClick={() => setOpenCat(openCat === i ? null : i)} style={{ borderColor: openCat === i ? "var(--b1)" : undefined }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)", width: 20, textAlign: "center" }}>{cat.count}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--t1)" }}>{cat.name}</span>
                </div>
                <span className="expand-icon" style={{ transform: openCat === i ? "rotate(45deg)" : "none" }}>+</span>
              </div>
              <div className="cat-expand" style={{ maxHeight: openCat === i ? 120 : 0, opacity: openCat === i ? 1 : 0, padding: openCat === i ? "12px 18px 10px" : "0 18px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{cat.nodes.map((n, j) => <span key={j} className="node-chip">{n}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SDK section */}
      <div style={{ marginBottom: 72 }}>
        <p className="mono-label section-label">PROGRAMMATIC_ACCESS</p>
        <p style={{ fontSize: 16, color: "var(--t2)", marginBottom: 28, maxWidth: 560, lineHeight: 1.8 }}>Build pipelines visually. Call them from code. Every deployed pipeline becomes an API endpoint.</p>
        <div className="grid-2" style={{ gap: 12 }}>
          <CodeBlock label="Python SDK" code={`from elements_sdk import Elements

client = Elements("https://your-instance.com")
client.login("you@email.com", "password")

result = client.deploy.run("support-bot", {
    "text": "I need help with my order"
})
print(result["output"])`} />
          <CodeBlock label="cURL" code={`curl -X POST /deploy/run/support-bot \\
  -H "Authorization: Bearer TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "I need help with my order"
  }'

# → { "output": "...", "duration": 1.24 }`} />
          <CodeBlock label="JavaScript" code={`const res = await fetch(
  "/deploy/run/support-bot",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer TOKEN",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: "I need help with my order"
    })
  }
);
const { output } = await res.json();`} />
          <CodeBlock label="Streaming (SSE)" code={`# Watch nodes execute in real-time
for event in client.execute.stream(graph):
    if event["type"] == "node_start":
        print(f"  ▸ {event['node_id']}")
    elif event["type"] == "node_complete":
        print(f"  ✓ {event['node_id']}")
    elif event["type"] == "done":
        print(f"✓ Done: {event['final_output']}")`} />
        </div>
      </div>

      <button onClick={() => onDemo("Elements")} className="primary-btn red-bg">Request a Demo →</button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [view, setView] = useState("home");
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoProduct, setDemoProduct] = useState("");

  const openDemo = (p: string) => { setDemoProduct(p); setDemoOpen(true); };

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }, [view]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          --bg: #040806;
          --s0: #071210;
          --s1: #0b1613;
          --s2: #101d19;
          --b0: #182924;
          --b1: #234039;
          --t1: #e8f0ec;
          --t2: #9ab0a8;
          --t3: #5e756d;
          --t4: #3a4f48;
          --accent: #10b981;
          --accent-dim: rgba(16,185,129,0.1);
          --accent-mid: rgba(16,185,129,0.2);
          --green: #10b981;
          --red: #f43f5e;
          --red-dim: rgba(244,63,94,0.1);
          --yellow: #eab308;
          --heading: 'Sora', sans-serif;
          --body: 'Sora', sans-serif;
          --mono: 'JetBrains Mono', monospace;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--t1); font-family: var(--body); overflow-x: hidden; line-height: 1.6; }
        ::selection { background: var(--accent-mid); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--b0); border-radius: 2px; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%,100% { opacity: 0.2; } 50% { opacity: 0.7; } }

        .fadeIn { animation: fadeIn 0.45s ease-out both; }

        .mono-label { font-family: var(--mono); font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; }
        .section-label { color: var(--t4); margin-bottom: 28px; }
        .glow-dot { width: 6px; height: 6px; border-radius: 0; flex-shrink: 0; }
        .accent-glow { background: var(--accent); box-shadow: 0 0 8px var(--accent); }
        .red-glow { background: var(--red); box-shadow: 0 0 8px var(--red); }
        .green-glow { background: var(--green); box-shadow: 0 0 6px var(--green); }

        .primary-btn {
          padding: 12px 28px; background: var(--accent); color: var(--bg); border: none;
          font-family: var(--mono); font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; cursor: pointer; transition: opacity 0.2s;
        }
        .primary-btn:hover { opacity: 0.85; }
        .primary-btn.red-bg { background: var(--red); }

        .back-btn {
          background: none; border: 1px solid var(--b0); padding: 8px 18px;
          color: var(--t2); font-family: var(--mono); font-size: 11px;
          cursor: pointer; letter-spacing: 0.06em; transition: all 0.2s;
        }
        .back-btn:hover { border-color: var(--b1); color: var(--t1); }

        .outline-btn {
          background: none; padding: 9px 22px; font-family: var(--mono); font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
        }
        .accent-border { border: 1px solid rgba(16,185,129,0.3); color: var(--accent); }
        .accent-border:hover { border-color: var(--accent); }
        .red-border { border: 1px solid rgba(244,63,94,0.3); color: var(--red); }
        .red-border:hover { border-color: var(--red); }

        .panel-dark { padding: 24px; background: rgba(11,22,19,0.8); border: 1px solid var(--b0); backdrop-filter: blur(4px); }

        .window-chrome { display: flex; align-items: center; gap: 6px; margin-bottom: 0; }
        .wdot { width: 8px; height: 8px; border-radius: 50%; }
        .window-title { margin-left: 12px; font-family: var(--mono); font-size: 10px; color: var(--t4); }

        .console-block { margin-top: 20px; padding: 12px 14px; background: var(--s0); border: 1px solid var(--b0); }
        .console-header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; }

        .code-row { display: flex; height: 26px; align-items: center; }
        .code-gutter { width: 32px; text-align: right; font-family: var(--mono); font-size: 11px; color: var(--t4); user-select: none; flex-shrink: 0; margin-right: 12px; }

        .tech-chip { padding: 4px 10px; font-family: var(--mono); font-size: 10px; color: var(--t3); border: 1px solid var(--b0); letter-spacing: 0.04em; }
        .tag-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
        .node-chip { padding: 4px 10px; font-family: var(--mono); font-size: 10px; color: var(--t2); border: 1px solid var(--b0); background: var(--s0); }

        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }

        .step-row { display: flex; gap: 18px; padding: 22px 0; }
        .step-num { font-family: var(--mono); font-size: 11px; color: var(--accent); flex-shrink: 0; padding-top: 2px; }
        .step-title { font-size: 15px; font-weight: 600; color: var(--t1); margin-bottom: 5px; }
        .step-desc { font-size: 13px; color: var(--t3); line-height: 1.7; }

        .feat-card { position: relative; padding: 20px; background: rgba(11,22,19,0.8); border: 1px solid var(--b0); cursor: pointer; transition: all 0.25s; backdrop-filter: blur(4px); }
        .feat-card:hover { border-color: var(--b1); box-shadow: 0 2px 16px rgba(16,185,129,0.04); }
        .feat-title { font-size: 14px; font-weight: 600; color: var(--t1); margin-bottom: 4px; }
        .feat-short { font-size: 12px; color: var(--t3); }
        .feat-expand { overflow: hidden; transition: all 0.3s ease; }
        .feat-desc { font-size: 12px; color: var(--t2); line-height: 1.7; margin-bottom: 8px; }
        .feat-detail { font-size: 11px; color: var(--t3); line-height: 1.7; padding-top: 8px; border-top: 1px solid var(--b0); }
        .expand-icon { font-family: var(--mono); font-size: 14px; color: var(--t4); transition: transform 0.2s; }

        .cat-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: rgba(11,22,19,0.8); border: 1px solid var(--b0); cursor: pointer; user-select: none; transition: all 0.2s; backdrop-filter: blur(4px); }
        .cat-row:hover { border-color: var(--b1); background: rgba(16,30,26,0.9); }
        .cat-expand { overflow: hidden; transition: all 0.3s ease; }

        .detail-page { max-width: 960px; margin: 0 auto; padding: 100px 24px 100px; }
        .detail-topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 56px; flex-wrap: wrap; gap: 16px; }
        .product-label { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .detail-title { font-family: var(--heading); font-size: clamp(36px, 6vw, 60px); font-weight: 700; color: var(--t1); line-height: 1.05; margin-bottom: 20px; letter-spacing: -0.03em; }
        .detail-subtitle { font-size: 16px; color: var(--t2); max-width: 600px; line-height: 1.8; }

        .product-card {
          position: relative; padding: 44px 40px; background: rgba(11,22,19,0.85);
          border: 1px solid var(--b0); cursor: pointer; transition: all 0.3s; overflow: hidden;
          backdrop-filter: blur(8px);
        }
        .product-card:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 8px 32px rgba(16,185,129,0.06); }
        .product-card:hover .card-arrow { opacity: 1; transform: translate(2px, -2px); }
        .card-arrow { opacity: 0.4; transition: all 0.3s; font-family: var(--mono); color: var(--t4); font-size: 18px; }

        .nav-link {
          background: none; border: none; cursor: pointer; font-family: var(--mono); font-size: 11px;
          letter-spacing: 0.06em; text-transform: uppercase; position: relative; padding: 4px 0; transition: color 0.2s;
        }
        .nav-active { color: var(--accent) !important; }
        .nav-dot { position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 3px; height: 3px; background: var(--accent); border-radius: 50%; }

        .screenshot-card { position: relative; }
        .ss-label { font-family: var(--mono); font-size: 11px; color: var(--t2); margin-bottom: 10px; font-weight: 500; }
        .ss-window { padding: 20px; background: rgba(11,22,19,0.9); border: 1px solid var(--b0); backdrop-filter: blur(4px); overflow: hidden; }

        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr 1fr !important; }
          .home-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <GridBg />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} product={demoProduct} />

      {/* NAV */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 52, background: "rgba(5,10,8,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--b0)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <button onClick={() => setView("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <div style={{ width: 8, height: 8, background: "var(--accent)", boxShadow: "0 0 10px var(--accent)", transform: "rotate(45deg)" }} />
          <span style={{ fontFamily: "var(--heading)", fontSize: 15, fontWeight: 700, color: "var(--t1)", letterSpacing: "0.04em" }}>PORTFOLIO</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {(["Home", "Cypher", "Elements"] as const).map((label) => {
            const v = label.toLowerCase();
            return (
              <button key={v} onClick={() => setView(v)} className={`nav-link ${view === v ? "nav-active" : ""}`} style={{ color: view === v ? "var(--accent)" : "var(--t3)" }}>
                {label}{view === v && <div className="nav-dot" />}
              </button>
            );
          })}
          <button onClick={() => openDemo("")} style={{ padding: "6px 16px", background: "none", border: "1px solid var(--accent)", color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "var(--accent)"; }}
          >Contact</button>
        </div>
      </header>

      {/* HOME */}
      {view === "home" && (
        <div className="fadeIn">
          <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px", position: "relative", textAlign: "center" }}>

            <p className="mono-label fadeIn" style={{ color: "var(--accent)", marginBottom: 28, animationDelay: "0.1s" }}>
              <span style={{ animation: "blink 1s step-end infinite", marginRight: 4 }}>▍</span>MAKING COMPLEX TECH ACCESSIBLE
            </p>

            <h1 className="fadeIn" style={{ fontFamily: "var(--heading)", fontSize: "clamp(36px, 6.5vw, 66px)", fontWeight: 800, lineHeight: 1.08, color: "var(--t1)", marginBottom: 28, letterSpacing: "-0.03em", animationDelay: "0.2s", maxWidth: 720 }}>
            From Ideas,<br /><span style={{ color: "var(--accent)" }}>to Experiences</span>
            </h1>

            <p className="fadeIn" style={{ fontSize: 16, color: "var(--t2)", maxWidth: 540, lineHeight: 1.8, marginBottom: 48, animationDelay: "0.35s" }}>
              I like building products that make complex things feel simple.
              Here&apos;s what I&apos;ve been working on.
            </p>

            <div className="fadeIn" style={{ display: "flex", gap: 12, justifyContent: "center", animationDelay: "0.5s" }}>
              <button onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })} className="primary-btn">See What I&apos;ve Built</button>
              <button onClick={() => openDemo("")} style={{ padding: "12px 28px", background: "none", color: "var(--t2)", border: "1px solid var(--b0)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--b1)"; e.currentTarget.style.color = "var(--t1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--b0)"; e.currentTarget.style.color = "var(--t2)"; }}
              >Get in Touch</button>
            </div>

            <div className="fadeIn" style={{ position: "absolute", bottom: 56, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animationDelay: "0.9s" }}>
              <span className="mono-label" style={{ color: "var(--t4)", fontSize: 9 }}>SCROLL</span>
              <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--accent), transparent)", animation: "pulse 2s ease-in-out infinite" }} />
            </div>
          </section>

          {/* Products */}
          <section id="products" style={{ padding: "80px 24px 140px", maxWidth: 960, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
              <div style={{ width: 40, height: 1, background: "var(--b1)" }} />
              <span className="mono-label" style={{ color: "var(--t4)" }}>PRODUCTS</span>
            </div>
            <div className="home-grid grid-2" style={{ gap: 16 }}>
              {/* Cypher */}
              <div className="product-card" onClick={() => setView("cypher")}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="glow-dot accent-glow" />
                    <span className="mono-label" style={{ color: "var(--accent)" }}>PRODUCT_01</span>
                  </div>
                  <span className="card-arrow">↗</span>
                </div>
                <h3 style={{ fontFamily: "var(--heading)", fontSize: 30, fontWeight: 700, color: "var(--t1)", marginBottom: 14, letterSpacing: "-0.02em" }}>
                  Cypher<span style={{ color: "var(--accent)" }}>.</span>
                </h3>
                <p style={{ fontSize: 14, color: "var(--t3)", lineHeight: 1.75, marginBottom: 24 }}>
                  A coding platform with 200+ problems, a built-in code editor, AI-powered analysis tools,
                  and a step-by-step execution tracer. Includes a beginner path, points system, and community.
                </p>
                <div className="tag-row" style={{ marginTop: 0 }}>
                  {["Coding Platform", "AI Analysis", "4 Languages", "200+ Problems"].map((t) => <span key={t} className="tech-chip">{t}</span>)}
                </div>
                <div style={{ position: "absolute", bottom: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.15 }} />
              </div>
              {/* Elements */}
              <div className="product-card" onClick={() => setView("elements")}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="glow-dot red-glow" />
                    <span className="mono-label" style={{ color: "var(--red)" }}>PRODUCT_02</span>
                  </div>
                  <span className="card-arrow">↗</span>
                </div>
                <h3 style={{ fontFamily: "var(--heading)", fontSize: 30, fontWeight: 700, color: "var(--t1)", marginBottom: 14, letterSpacing: "-0.02em" }}>
                  Elements<span style={{ color: "var(--red)" }}>.</span>
                </h3>
                <p style={{ fontSize: 14, color: "var(--t3)", lineHeight: 1.75, marginBottom: 24 }}>
                  A visual pipeline builder with 54 node types across 9 categories — including GPU compute.
                  Build AI systems visually, deploy as APIs, and call from Python SDK, JavaScript, or cURL.
                </p>
                <div className="tag-row" style={{ marginTop: 0 }}>
                  {["Visual Builder", "54 Nodes", "GPU Compute", "Python SDK", "Deploy as API"].map((t) => <span key={t} className="tech-chip">{t}</span>)}
                </div>
                <div style={{ position: "absolute", bottom: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, var(--red), transparent)", opacity: 0.15 }} />
              </div>
            </div>
          </section>
        </div>
      )}

      {view === "cypher" && <CypherDetail onBack={() => setView("home")} onDemo={openDemo} />}
      {view === "elements" && <ElementsDetail onBack={() => setView("home")} onDemo={openDemo} />}

    </>
  );
}