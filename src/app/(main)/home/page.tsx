"use client"
import { CardProgressItem } from "@/components/card-progress-item";
import { Box, Settings } from "lucide-react";

import { HomeCharts } from "./home-charts";
import { useWalletHealth } from "./hooks/use-wallet-health";
import { HomeChartsBar } from "./home-charts-bar";
import { HomeChartsCircle } from "./home-charts-circle";
import { HomeTransactionNextToDue } from "./home-transaction-next-to-due";
import { useEffect, useState } from "react";
import { closestCenter, DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable";
import {
    restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import { useMediaQuery } from "@/hooks/use-media-query";

type ItemId = 'HomeChartsBar' | 'HomeChartsCircle' | 'HomeTransactionNextToDue';

const COMPONENTS_MAP: Record<ItemId, React.FC<{ id: string }>> = {
    HomeChartsBar,
    HomeChartsCircle,
    HomeTransactionNextToDue,
};

export default function HomePage() {

    const isMdUp = useMediaQuery('(min-width: 768px)')

    const [items, setItems] = useState<ItemId[]>([
        'HomeChartsBar',
        'HomeChartsCircle',
        'HomeTransactionNextToDue',
    ]);

    const [isDragging, setIsDragging] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
    );

    function handleDragStart(event: DragStartEvent) {
        setIsDragging(true);
    }
    function handleDragEnd(event: DragEndEvent) {
        setIsDragging(false);
        const { active, over } = event;
        if (!over) return; // retorna se over for null

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id as ItemId);
                const newIndex = items.indexOf(over.id as ItemId);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }


    useEffect(() => {
        if (isDragging) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isDragging]);

    const { data: walletHealth } = useWalletHealth();

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
        >
            <div className="flex flex-col w-full p-4 2md:p-0">
                <div className="flex-4">
                    <div className="grid grid-cols-6 gap-8">
                        <div className="col-span-6 2md:col-span-4">
                            <HomeCharts />
                        </div>
                        <div className="col-span-6 2md:col-span-2 grid grid-cols-1 md:grid-cols-2 2md:grid-cols-1 gap-8">
                            <CardProgressItem
                                title="Saúde da carteira"
                                icon={<Settings />}
                                percentage={walletHealth?.data.value ?? 0}
                                variant="green"
                            />

                            <CardProgressItem
                                title="Gastos"
                                icon={<Box />}
                                percentage={45}
                                variant="red"
                            />
                        </div>
                    </div>
                </div>
                
                <SortableContext items={items}
                    strategy={isMdUp ? horizontalListSortingStrategy : verticalListSortingStrategy}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        {items.map(id => {
                            const Component = COMPONENTS_MAP[id];
                            // Define o span dinamicamente
                            const colSpan = id === 'HomeTransactionNextToDue' ? 'col-span-1' : 'col-span-1';
                            return (
                                <div key={id} className={colSpan}>
                                    <Component id={id} />
                                </div>
                            );
                        })}
                    </div>
                </SortableContext>

                {/* <div className="flex-1">
                <CreditCardItem />
            </div>  */}
            </div>
        </DndContext>
    )
}