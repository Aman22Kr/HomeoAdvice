import {
  Heart, Smile, Sparkles, Droplets, Activity, Brain, Microscope, Wind, MessageCircle, Droplet,
  Stethoscope, ShieldCheck, FlaskConical, Ambulance, Home, Moon, Pill, Baby, Clock,
} from 'lucide-react';

const MAP = {
  heart: Heart, tooth: Smile, skin: Sparkles, liver: Droplets, gut: Activity, brain: Brain, micro: Microscope,
  lungs: Wind, mind: MessageCircle, kidney: Droplet, stetho: Stethoscope, shield: ShieldCheck, flask: FlaskConical,
  ambulance: Ambulance, activity: Activity, home: Home, drop: Droplets, moon: Moon, pill: Pill, baby: Baby, clock: Clock,
};

export default function Icon({ name, ...props }) {
  const C = MAP[name] || Stethoscope;
  return <C aria-hidden="true" {...props} />;
}
