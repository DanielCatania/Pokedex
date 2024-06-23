class handleSentry {
  sentry: React.MutableRefObject<any>;
  status: "visible" | "invisible" = "visible";
  constructor(sentryRef: React.MutableRefObject<any>) {
    this.sentry = sentryRef;
  }

  change() {
    if (this.status === "visible") {
      this.disable();
    } else {
      this.enable();
    }
  }

  enable() {
    this.sentry.current.classList.remove("invisible");
    this.status = "visible";
  }

  disable() {
    this.sentry.current.classList.add("invisible");
    this.status = "invisible";
  }
}
export default handleSentry;
