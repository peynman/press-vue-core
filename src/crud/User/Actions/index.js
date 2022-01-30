import Import from './Import'
import ChangePassword from './ChangePassword'

export default function ($component) {
  return {
    Import: Import($component),
    ChangePassword: ChangePassword($component),
  }
}
