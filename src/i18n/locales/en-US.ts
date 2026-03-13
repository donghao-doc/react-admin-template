const enUSMessages = {
  common: {
    loading: 'Loading...',
    confirm: 'Confirm',
    cancel: 'Cancel',
    backHome: 'Back Home',
    backPrevious: 'Go Back',
    goLogin: 'Go to Login',
  },
  app: {
    title: 'Admin Template',
    subtitle: 'React Admin Template',
  },
  auth: {
    loginSuccess: 'Login successful',
    username: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    submit: 'Login',
    usernamePlaceholder: 'Enter username',
    passwordPlaceholder: 'Enter password',
    usernameRequired: 'Please enter your username',
    passwordRequired: 'Please enter your password',
    pageTitle: 'Admin Login',
    pageSubtitle: 'After signing in with a demo account, the current user profile will be initialized automatically.',
    accountAdmin: 'Super Admin',
    accountEditor: 'Content Editor',
    accountVisitor: 'Read Only Visitor',
    logout: 'Logout',
    logoutConfirmTitle: 'Confirm logout?',
    logoutConfirmContent: 'You will be redirected to the login page and need to sign in again to continue.',
    loggedOut: 'Not signed in',
  },
  exception: {
    forbidden: 'Sorry, you do not have permission to access this page.',
    notFound: 'Sorry, the page you visited does not exist or has been removed.',
  },
  http: {
    networkError: 'Network error, please try again later',
    unknownError: 'Unknown error',
    requestFailed: 'Request failed',
  },
  menu: {
    dashboard: 'Dashboard',
    system: 'System',
    systemUser: 'User Management',
    content: 'Content',
  },
} as const

export default enUSMessages
