"use client";

import { PAYMENT_FREQUENCIES, TIERS } from "@/config";
import { useState } from "react";
import { PricingHeader } from "./pricing-header";
import { PricingCard } from "./pricing-card";

export const Pricing = () => {
    const [selectedPaymentFreq, setSelectedPaymentFreq] = useState(
        PAYMENT_FREQUENCIES[0],
    );

    return (
        <section className="flex flex-col items-center gap-10 py-10">
            {/* Section Header */}
            <PricingHeader
                title="Planos e Preços"
                subtitle="Receba créditos ilimitados ao pagar anualmente e economize no seu plano."
                frequencies={PAYMENT_FREQUENCIES}
                selectedFrequency={selectedPaymentFreq}
                onFrequencyChange={setSelectedPaymentFreq}
            />

            {/* Pricing Cards */}
            <div className="grid w-full max-w-6xl gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {TIERS.map((tier, i) => (
                    <PricingCard
                        key={i}
                        tier={tier}
                        paymentFrequency={selectedPaymentFreq}
                    />
                ))}
            </div>
        </section>
    );
};