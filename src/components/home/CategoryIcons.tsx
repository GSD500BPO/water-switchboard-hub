import { Link } from "react-router-dom";
import { 
  Droplets, 
  Home, 
  FlaskConical, 
  AlertCircle, 
  Atom, 
  ThermometerSun 
} from "lucide-react";

const categories = [
  {
    icon: Droplets,
    label: "Water Testing",
    href: "/water-testing",
    color: "text-secondary",
  },
  {
    icon: Home,
    label: "Whole House Filters",
    href: "/filters",
    color: "text-secondary",
  },
  {
    icon: FlaskConical,
    label: "Well Water Safety",
    href: "/well-water",
    color: "text-secondary",
  },
  {
    icon: AlertCircle,
    label: "Lead Testing",
    href: "/lead-testing",
    color: "text-secondary",
  },
  {
    icon: Atom,
    label: "PFAS Concerns",
    href: "/pfas",
    color: "text-secondary",
  },
  {
    icon: ThermometerSun,
    label: "Hard Water Solutions",
    href: "/hard-water",
    color: "text-secondary",
  },
];

export function CategoryIcons() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Popular Topics
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore guides and resources for common water quality concerns
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category.label}
              to={category.href}
              className="group flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:border-secondary hover:shadow-md transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mb-3 group-hover:bg-secondary/10 transition-colors">
                <category.icon className={`h-7 w-7 ${category.color}`} />
              </div>
              <span className="text-sm font-medium text-center text-foreground group-hover:text-secondary transition-colors">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
