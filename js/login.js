var app = new Vue({
  el: '#app',
  data: {
    message: '',
    loginModel: true,
    mobile: '',
    password: '',
    passwordConfirm: ''
  },
  methods: {
    login: function() {
      axios.post('http://localhost:8080/api/auth', {
        mobile: this.mobile, password: this.password
      })
      .then(r => {
        console.log(r)
        if (r.data.errorCode) {
          this.message = r.data.errorMessage
        } else {
          this.message = r.data.mobile
        }
      })
      .catch(e => {
        console.log(e)
        if (e.data.errorMessage) {
          this.message = e.data.errorMessage
        }
      })
    },
    register: function() {
      if (this.password != this.passwordConfirm) {
        this.message = '两次输入的密码不一样，请重新输入'
        return
      }

      axios.post('http://localhost:8080/api/auth/register', {
        mobile: this.mobile, password: this.password
      })
      .then(r => {
        console.log(r)
        if (r.data.errorCode) {
          this.message = r.data.errorMessage
        } else {
          this.message = r.data.mobile
        }
      })
      .catch(e => {
        console.log(e)
        if (e.data.errorMessage) {
          this.message = e.data.errorMessage
        }
      })
    },
    switchToSignUp: function() {
      this.loginModel = false
      this.clearCredential()
    },
    switchToLogin: function() {
      this.loginModel = true
      this.clearCredential()
    },

    clearCredential: function() {
      this.mobile = ''
      this.password = ''
      this.passwordConfirm = ''
    }
  }
})
