import * as Admin from './Admin'
import * as Employee from './Employee'
import * as Image from './Image'
import * as Subdivision from './Subdivision'

export const validator = {
	...Admin,
	...Employee,
	...Subdivision,
	...Image,
}
