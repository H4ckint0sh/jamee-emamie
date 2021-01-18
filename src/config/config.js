import { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import getMenuItems from './menuItems'
import themes from './themes'
import parseLanguages from 'base-shell/lib/utils/locale'
import grants from './grants'
import Loading from 'material-ui-shell/lib/components/Loading/Loading'
import getDefaultRoutes from './getDefaultRoutes'
import { defaultUserData, isGranted } from 'rmw-shell/lib/utils/auth'

const config = {
  firebase: {
    prod: {
      initConfig: {
        apiKey: "AIzaSyBw5d61Z3NUReqD7372Y02MoyQT-9P8e8s",
				authDomain: "jamee-emamie-dev.firebaseapp.com",
				databaseURL: "https://jamee-emamie-dev-default-rtdb.europe-west1.firebasedatabase.app",
				projectId: "jamee-emamie-dev",
				storageBucket: "jamee-emamie-dev.appspot.com",
				messagingSenderId: "116218361563",
				appId: "1:116218361563:web:4b8235924fddd5ea09befe",
				measurementId: "G-FEQPTJXDLV"
      },
      messaging: {
        publicVapidKey:
          'BINrNXELxb-yv5F_tRYJ9xY4l2GpHf2d_723AGddgMPC8UPQqLAqMKD3Lklqz25Nn9PtaQYSK89UDlX-jPuEppo',
      },
    },
    dev: {
      initConfig: {
        apiKey: "AIzaSyBw5d61Z3NUReqD7372Y02MoyQT-9P8e8s",
				authDomain: "jamee-emamie-dev.firebaseapp.com",
				databaseURL: "https://jamee-emamie-dev-default-rtdb.europe-west1.firebasedatabase.app",
				projectId: "jamee-emamie-dev",
				storageBucket: "jamee-emamie-dev.appspot.com",
				messagingSenderId: "116218361563",
				appId: "1:116218361563:web:4b8235924fddd5ea09befe",
				measurementId: "G-FEQPTJXDLV"
      },
      messaging: {
        publicVapidKey:
          'BINrNXELxb-yv5F_tRYJ9xY4l2GpHf2d_723AGddgMPC8UPQqLAqMKD3Lklqz25Nn9PtaQYSK89UDlX-jPuEppo',
      },
    },
    devd: {
      initConfig: {
        apiKey: "AIzaSyBw5d61Z3NUReqD7372Y02MoyQT-9P8e8s",
				authDomain: "jamee-emamie-dev.firebaseapp.com",
				databaseURL: "https://jamee-emamie-dev-default-rtdb.europe-west1.firebasedatabase.app",
				projectId: "jamee-emamie-dev",
				storageBucket: "jamee-emamie-dev.appspot.com",
				messagingSenderId: "116218361563",
				appId: "1:116218361563:web:4b8235924fddd5ea09befe",
				measurementId: "G-FEQPTJXDLV"
      },
      messaging: {
        publicVapidKey:
          'BINrNXELxb-yv5F_tRYJ9xY4l2GpHf2d_723AGddgMPC8UPQqLAqMKD3Lklqz25Nn9PtaQYSK89UDlX-jPuEppo',
      },
    },
    firebaseuiProps: {
      signInOptions: [
        'google.com',
        'facebook.com',
        'twitter.com',
        'github.com',
        'password',
        'phone',
      ],
    },
  },
  googleMaps: {
    apiKey: 'AIzaSyByMSTTLt1Mf_4K1J9necAbw2NPDu2WD7g',
  },
  auth: {
    grants,
    redirectTo: '/dashboard',
    persistKey: 'base-shell:auth',
    signInURL: '/signin',
    onAuthStateChanged: async (user, auth, firebaseApp) => {
      try {
        if (user != null) {
          const grantsSnap = await firebaseApp
            .database()
            .ref(`user_grants/${user.uid}`)
            .once('value')
          const notifcationsDisabledSnap = await firebaseApp
            .database()
            .ref(`disable_notifications/${user.uid}`)
            .once('value')

          const isAdminSnap = await firebaseApp
            .database()
            .ref(`admins/${user.uid}`)
            .once('value')

          firebaseApp
            .database()
            .ref(`user_grants/${user.uid}`)
            .on('value', (snap) => {
              auth.updateAuth({ grants: snap.val() })
            })

          firebaseApp
            .database()
            .ref(`disable_notifications/${user.uid}`)
            .on('value', (snap) => {
              auth.updateAuth({ notificationsDisabled: !!snap.val() })
            })

          firebaseApp
            .database()
            .ref(`admins/${user.uid}`)
            .on('value', (snap) => {
              auth.updateAuth({ isAdmin: !!snap.val() })
            })

          auth.updateAuth({
            ...defaultUserData(user),
            grants: grantsSnap.val(),
            notificationsDisabled: notifcationsDisabledSnap.val(),
            isAdmin: !!isAdminSnap.val(),
            isGranted,
          })

          firebaseApp.database().ref(`users/${user.uid}`).update({
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            providers: user.providerData,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            notificationsDisabled: notifcationsDisabledSnap.val(),
          })

          await firebaseApp
            .database()
            .ref(`user_chats/${user.uid}/public_chat`)
            .update({
              displayName: 'Public Chat',
              lastMessage: 'Group chat',
              path: `group_chat_messages/public_chat`,
            })
        } else {
          firebaseApp.database().ref().off()
          auth.setAuth(defaultUserData(user))
        }
      } catch (error) {
        console.warn(error)
      }
    },
  },
  getDefaultRoutes,
  routes,
  locale: {
    locales,
    persistKey: 'base-shell:locale',
    defaultLocale: parseLanguages(['en', 'de', 'ru'], 'en'),
    onError: (e) => {
      //console.warn(e)

      return
    },
  },
  menu: {
    getMenuItems,
    MenuHeader: lazy(() =>
      import('material-ui-shell/lib/components/MenuHeader/MenuHeader')
    ),
  },
  theme: {
    themes,
    defaultThemeID: 'default',
    defaultType: 'light',
  },
  pages: {
    LandingPage: lazy(() => import('../pages/LandingPage')),
    PageNotFound: lazy(() => import('../pages/PageNotFound')),
  },
  components: {
    Menu: lazy(() =>
      import('rmw-shell/lib/containers/FirebaseMenu/FirebaseMenu')
    ),
    Loading,
  },

  containers: {
    AppContainer: lazy(() =>
      import('material-ui-shell/lib/containers/AppContainer/AppContainer')
    ),
    LayoutContainer: lazy(() =>
      import('rmw-shell/lib/containers/LayoutContainer/LayoutContainer')
    ),
  },
}

export default config
