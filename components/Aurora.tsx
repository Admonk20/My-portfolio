export default function Aurora() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div
        className="absolute -top-40 -left-40 h-[60vw] w-[60vw] rounded-full opacity-60 animate-drift-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(214,188,250,0.55) 0%, rgba(214,188,250,0) 70%)",
          filter: "blur(120px)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[55vw] w-[55vw] rounded-full opacity-50 animate-drift"
        style={{
          background:
            "radial-gradient(circle, rgba(243,217,245,0.5) 0%, rgba(243,217,245,0) 70%)",
          filter: "blur(140px)",
          mixBlendMode: "screen",
          animationDelay: "-8s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[50vw] w-[50vw] rounded-full opacity-40 animate-drift-slow"
        style={{
          background:
            "radial-gradient(circle, rgba(184,232,210,0.45) 0%, rgba(184,232,210,0) 70%)",
          filter: "blur(130px)",
          mixBlendMode: "screen",
          animationDelay: "-16s",
        }}
      />
      <div
        className="absolute top-2/3 left-0 h-[40vw] w-[40vw] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(245,230,200,0.45) 0%, rgba(245,230,200,0) 70%)",
          filter: "blur(110px)",
          mixBlendMode: "screen",
          animationDelay: "-4s",
        }}
      />
    </div>
  );
}
