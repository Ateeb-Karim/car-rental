import Hero from "@/components/home/hero";
import Category from "@/components/home/categories";
import FeaturedCars from "@/components/home/featuredcars";
import TrustItem from "@/components/home/trustitem";

type trustdataType = {
  icon: string;
  title: string;
  body: string;
};

export default function HomePage() {
  const trustdata: trustdataType[] = [
    {
      icon: "24",
      title: "24/7 Support",
      body: "Roadside help and customer service, day or night.",
    },
    {
      icon: "✓",
      title: "Fully Insured",
      body: "Every rental includes standard coverage, no surprises.",
    },
    {
      icon: "◎",
      title: "Flexible Pickup",
      body: "Choose from multiple locations, or request custom pickup.",
    },
  ];
  return (
    <main className="min-h-screen bg-bg text-text">
      <Hero />
      <Category />
      <FeaturedCars />

      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {trustdata.map((item) => {
            return (
              <TrustItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                body={item.body}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
