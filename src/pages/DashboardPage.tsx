import { useState, type JSX } from "react";
import Navbar from "../components/Navbar";


export type TabName = 'Meals' | 'Recipes' | 'Metrics' | 'Premium' | 'More';

const tabs: Record<TabName, JSX.Element> = {
    'Meals': <div>Meals</div>,
    'Recipes': <div>Recipes</div>,
    'Metrics': <div>Metrics</div>,
    'Premium': <div>Premium</div>,
    'More': <div>More</div>,
}


const defaultTab: TabName = 'Meals';


export default function DashboardPage(){
    const [selectedTab, setSelectedTab] = useState<TabName>(defaultTab);
    const currentPage = tabs[selectedTab];

    const handleTabSelect = (tabName: TabName) => {
        setSelectedTab(tabName);
    }

    return (
        <div className="min-h-dvh bg-green-300 flex flex-col">
            <main className="flex-1 overflow-y-auto">
                {currentPage}
            </main>
            <Navbar selectedTab={selectedTab} onSelectTab={handleTabSelect}/>
        </div>
    )
}