import { cn } from "clsx-tailwind-merge"


const PasswordStrength = ({passStrength}: {passStrength: number}) => {
  return (
    <div className="flex gap-2">
        {Array.from({length: passStrength + 1}).map((i, ind)=> (
          <div 
            className={cn("h-2 w-20 rounded-md", {
              "bg-red-500": passStrength === 0,
              "bg-orange-500": passStrength === 1,
              "bg-yellow-500": passStrength === 2,
              "bg-green-500": passStrength === 3,
            })} 
            key={ind}
          >

          </div>
        ))}
    </div>
  )
}

export default PasswordStrength