import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { trackEvent } from "@/lib/analytics";
import { Lock } from "lucide-react";

interface Props {
  onSuccess: () => void;
}

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian number"),
  profession: z.string().min(1, "Select your profession"),
});

const professions = ["Student", "Professional", "Entrepreneur", "Homemaker", "Other"];

const RegistrationForm = ({ onSuccess }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", profession: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fieldErrors[e.path[0] as string] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    trackEvent("form_submitted", { profession: form.profession });

    // Attempt Razorpay checkout
    try {
      const scriptLoaded = await new Promise<boolean>((resolve) => {
        if ((window as any).Razorpay) return resolve(true);
        const s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        s.onload = () => resolve(true);
        s.onerror = () => resolve(false);
        document.body.appendChild(s);
      });

      if (!scriptLoaded) {
        // Demo mode: skip payment
        onSuccess();
        return;
      }

      const options = {
        key: "rzp_test_REPLACE_ME", // Replace with your Razorpay key
        amount: 9900,
        currency: "INR",
        name: "Goal Hacking Workshop",
        description: "₹99 Workshop by Ankit Neerav",
        handler: () => {
          trackEvent("payment_success");
          onSuccess();
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch {
      // Fallback: redirect directly for demo
      onSuccess();
    }
  };

  const inputClass =
    "w-full h-12 rounded-xl bg-secondary text-foreground px-4 text-base border-2 border-transparent focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col px-6 py-8 overflow-y-auto"
    >
      <h1 className="text-2xl font-bold text-foreground mb-1">Secure Your Spot</h1>
      <p className="text-base text-primary font-medium mb-8">
        Goal Hacking Workshop &nbsp;|&nbsp; ₹99 &nbsp;|&nbsp; March 1
      </p>

      <div className="space-y-4 mb-8">
        <div>
          <input
            className={inputClass}
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            className={inputClass}
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <input
            className={inputClass}
            placeholder="Phone Number (10 digits)"
            type="tel"
            maxLength={10}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
          />
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <select
            className={inputClass}
            value={form.profession}
            onChange={(e) => setForm({ ...form, profession: e.target.value })}
          >
            <option value="" disabled>
              Profession
            </option>
            {professions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.profession && <p className="text-destructive text-xs mt-1">{errors.profession}</p>}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="cta-button-large disabled:opacity-50"
      >
        {loading ? "Processing..." : "Join The Workshop — ₹99"}
      </button>

      <p className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center gap-1.5">
        <Lock className="w-3 h-3" />
        Your information is safe and never shared
      </p>
    </motion.div>
  );
};

export default RegistrationForm;
