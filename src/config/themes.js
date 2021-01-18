import red from '@material-ui/core/colors/red'
import pink from '@material-ui/core/colors/pink'
import green from '@material-ui/core/colors/green'

const themes = [
  {
    id: 'default',
    source: {
			direction: 'rtl',
      palette: {
        primary: { main: '#343434' },
        secondary: {
          main: '#c62828',
        },
      },
    },
  },
  {
    id: 'red',
    color: red[500],
    source: {
			direction: 'rtl',
      palette: {
        primary: red,
        secondary: pink,
        error: red,
      },
    },
  },
  {
    id: 'green',
		color: green[500],
    source: {
			direction: 'rtl',
      palette: {
        primary: green,
        secondary: red,
        error: red,
      },
    },
  },
  {
		id: 'standard',
		source: {
			direction: 'rtl',
    },
  },
]

export default themes
