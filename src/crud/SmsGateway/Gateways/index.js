import SMSIRFast from './SMSIRFast'
import SMSIRSimple from './SMSIRSimple'
import KavehnegarLookup from './KavehnegarLookup'
import Kavehnegar from './Kavehnegar'

export default $component => ([
  SMSIRFast($component),
  SMSIRSimple($component),
  KavehnegarLookup($component),
  Kavehnegar($component),
])
