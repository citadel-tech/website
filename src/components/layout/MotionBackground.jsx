export default function MotionBackground() {
  return (
    <div className="motion-background" aria-hidden="true">
      <div className="motion-background__veil" />
      <div className="motion-background__orbit motion-background__orbit--one" />
      <div className="motion-background__orbit motion-background__orbit--two" />
      <svg className="motion-background__network" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M-60 650C170 560 250 705 470 590S770 405 980 500s310 12 520-115" />
        <path d="M-20 245C215 355 340 180 555 280s325 120 490-15 290-120 430-35" />
        <circle cx="470" cy="590" r="4" />
        <circle cx="980" cy="500" r="4" />
        <circle cx="555" cy="280" r="4" />
        <circle cx="1045" cy="265" r="4" />
      </svg>
    </div>
  )
}
