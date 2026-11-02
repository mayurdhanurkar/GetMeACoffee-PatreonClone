import React from "react";

const Dashboard = () => {
  return (
    <div>
      {/* Yeh poore dashboard ko wrap karta hai. */}
      <main className="container py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          {/* Yeh dashboard ke content ko center mein rakhta hai. */}
          <div className="mb-9 text-center">
            {/* Yeh section ka chhota title dikhata hai. */}
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Account settings
            </p>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Welcome to your dashboard</h1>
            {/* Yeh dashboard ka chhota sa intro batata hai. */}
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
              Set up your public creator page and connect payments in one place.
            </p>
          </div>

          <form
            onSubmit={saveProfile}
            className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-black/20 sm:p-8"
          >
            {/* Yeh creator profile ka preview section hai. */}
            <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
              {/* Yeh profile photo ya naam ka pehla akshar dikhata hai. */}
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-xl font-bold text-slate-950">
                {profile.profilePicture ? (
                  <img src={profile.profilePicture} alt="" className="h-full w-full object-cover" />
                ) : (
                  (profile.name || "?").charAt(0).toUpperCase()
                )}
              </div>
              {/* Yeh profile ke baare mein heading aur jaankari rakhta hai. */}
              <div>
                {/* Yeh profile section ka naam dikhata hai. */}
                <p className="font-semibold text-white">Your creator profile</p>
                {/* Yeh batata hai ki details public page par dikhenge. */}
                <p className="text-sm text-slate-400">These details appear on your public page.</p>
              </div>
            </div>

            {/* Yeh profile fields ko do columns mein sajata hai. */}
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map(([name, label, placeholder, type]) => (
                <label key={name} className="block text-sm font-medium text-slate-200">
                  {/* Yeh field ka naam aur uska input ek saath rakhta hai. */}
                  {label}
                  <input
                    name={name}
                    type={type}
                    value={profile[name]}
                    onChange={updateField}
                    placeholder={placeholder}
                    readOnly={name === "email"}
                    required={!["profilePicture", "coverPicture"].includes(name)}
                    className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20 read-only:cursor-not-allowed read-only:opacity-60"
                  />
                </label>
              ))}
              <label className="block text-sm font-medium text-slate-200 sm:col-span-2">
                {/* Yeh Razorpay secret ke liye input ka naam dikhata hai. */}
                Razorpay Secret
                <input
                  name="razorpaySecret"
                  type="password"
                  value={profile.razorpaySecret}
                  onChange={updateField}
                  placeholder="Enter a new secret to update it"
                  autoComplete="new-password"
                  className="mt-2 block w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                />
              </label>
            </div>

            {/* Yeh secret ko surakshit rakhne ki baat samjhata hai. */}
            <p className="mt-4 text-xs leading-5 text-slate-500">
              The Razorpay secret is encrypted before storage and is never sent back to this page.
            </p>
            {/* Yeh status sandesh aur save button ko rakhta hai. */}
            <div className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
              {/* Yeh profile save hone ka status dikhata hai. */}
              <p
                className={`text-sm ${message.includes("saved") ? "text-emerald-300" : "text-amber-300"}`}
                role="status"
              >
                {message}
              </p>
              {/* Yeh profile details save karne ka button hai. */}
              <button
                type="submit"
                disabled={status === "loading" || status === "saving"}
                className="w-full rounded-xl bg-blue-500 px-8 py-3 text-sm font-bold text-white transition hover:bg-blue-400 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
              >
                {status === "saving" ? "Saving..." : "Save profile"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

export const metadata = {
  title: 'Dashboard | Buy Me A Coffee',
  description: 'Manage your account and payment settings.',
}