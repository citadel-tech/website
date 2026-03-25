const LOGO_SRC = `${import.meta.env.BASE_URL}coinswap-bw.svg`

export default function CoinSwapLogo({ className = '', ...props }) {
  return (
    <img
      src={LOGO_SRC}
      alt=""
      aria-hidden="true"
      className={className}
      draggable="false"
      {...props}
    />
  )
}
