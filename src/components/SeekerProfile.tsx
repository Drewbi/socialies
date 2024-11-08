import { PersonIcon } from "@radix-ui/react-icons";

export default function({ name, id, onClick, className }: { name: string, id: string, onClick?: () => void, className?: string }) {
    return (
        <div onClick={onClick} id={id} className={`${className} hover:cursor-pointer`}>
            <div className="w-24 h-24 flex justify-center items-center p-4 bg-secondary rounded-full border-2 border-secondary hover:border-white">
                <PersonIcon className="w-24 h-24"></PersonIcon>
            </div>
            <div className="text-center text-xl">{ name }</div>
        </div>
    )
}