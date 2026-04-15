interface NavbarIconProps {
    label: string;
}

export default function NavbarIcon({ label }: NavbarIconProps) {
    return (
        <div>{label}</div>
    )
}