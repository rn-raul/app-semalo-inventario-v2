import {User, CalendarDays, Search, RectangleEllipsis, Camera, Barcode, Mountain, CalendarClock, LogOut} from "lucide-react-native"

type IconProps = {
    name: 'user' | 'calendar' | 'search' | 'rectangle' | 'camera' | 'barcode' | 'mountain' | 'calendar-clock' | 'log-out',
    size?: number,
    color?: string
}
export type { IconProps }

export function Icon({name, size, color}: IconProps) {
    return (
        <>
            {name === 'user' && <User size={size} color={color} />}
            {name === 'calendar' && <CalendarDays size={size} color={color} />}
            {name === 'search' && <Search size={size} color={color} />}
            {name === 'rectangle' && <RectangleEllipsis size={size} color={color} />}
            {name === 'camera' && <Camera size={size} color={color} />}
            {name === 'barcode' && <Barcode size={size} color={color} />}
            {name === 'mountain' && <Mountain size={size} color={color} />}
            {name === 'log-out' && <LogOut size={size} color={color} />}
            {name === 'calendar-clock' && <CalendarClock size={size} color={color} />}
        </>
    )
}