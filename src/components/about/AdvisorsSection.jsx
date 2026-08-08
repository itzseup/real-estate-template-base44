import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import AdvisorCard from "./AdvisorCard";

export default function AdvisorsSection() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await base44.entities.Agent.list("-created_date", 20);
      setAgents(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="py-24 md:py-40 px-[4%] md:px-[2%] max-w-[1400px] mx-auto">
      <div className="text-center mb-16 md:mb-24">
        <h2 className="font-display text-display-lg font-light mt-3">
          Meet the <span className="italic">Advisors</span>
        </h2>
        <p className="font-body text-sm text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed">
          Each advisor brings a unique perspective shaped by years of experience 
          and a genuine passion for architecture and community.
        </p>
      </div>

      {loading ?
      <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-border border-t-accent rounded-full animate-spin" />
        </div> :

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {agents.map((agent, i) => (
            <AdvisorCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      }
    </section>);

}