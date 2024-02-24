class DASHBOARD {
    private root = '/i'

    HOME = this.root
    TASKS = `${this.root}/tasks`
    HABITS = `${this.root}/habits`
    SETTINGS = `${this.root}/settings`
    TIME_BLOCKING = `${this.root}/time-blocking`
  static SITE_NAME: string
}

export const DASHBOARD_PAGE = new DASHBOARD()