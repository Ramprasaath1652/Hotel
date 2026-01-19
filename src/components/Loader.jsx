const Loader = () => (
    <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ background: "rgba(255,255,255,0.6)", zIndex: 99999 }}
    >
        <div className="spinner-border text-primary" />
    </div>
);

export default Loader;
