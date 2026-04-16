import Diamond from '../assets/diamond-svgrepo-com.svg?react'
import ForkAndKnife from '../assets/fork-and-knife-meal-svgrepo-com.svg?react'
import Graph from '../assets/metrics-svgrepo-com.svg?react'
import RecipesSvg from '../assets/recipes-svgrepo-com.svg?react'
import BurgerMenu from '../assets/burger-menu-svgrepo-com.svg?react'
import type { TabName } from '../pages/DashboardPage'


const navItems = [
    {
        name: 'Meals',
        icon: <ForkAndKnife className='w-full h-full'/>
    },
    {
        name: 'Recipes',
        icon: <RecipesSvg className='w-full h-full'/>
    },
    {
        name: 'Metrics',
        icon: <Graph className='w-full h-full'/>
    },
    {
        name: 'Premium',
        icon: <Diamond className='w-full h-full'/>
    },
    {
        name: 'More',
        icon: <BurgerMenu className='w-full h-full'/>
    }
]


interface NavbarProps {
    selectedTab: TabName;
    onSelectTab: (tabName: TabName) => void;
}

export default function Navbar({selectedTab, onSelectTab}: NavbarProps){ 
    return (
    <nav className="w-full h-16 bg-black text-white flex justify-center">
        <div className="w-full max-w-250 flex items-center justify-around px-2">
            {navItems.map((item) => (
                <button 
                    key={item.name} 

                    className={`flex flex-col items-center justify-center w-16 ${selectedTab === item.name ? 'text-gray-400' : 'hover:text-gray-400'} transition-colors duration-200`}
                    onClick={() => onSelectTab(item.name as TabName)}
                >
                    <div className="w-5 h-5 flex items-center justify-center mb-1">
                        {item.icon}
                    </div>
                    <span className="text-[15px]">{item.name}</span>
                </button>
            ))}
        </div>
    </nav>
    )
}