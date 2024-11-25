import { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | Modern Shop",
  description: "Learn more about Modern Shop and our mission",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">About Modern Shop</h1>
          <p className="text-lg text-muted-foreground">
            Modern Shop is your premier destination for contemporary fashion and
            lifestyle products. Founded with a vision to provide high-quality,
            trendsetting items at accessible prices.
          </p>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              To deliver exceptional shopping experiences through carefully curated
              products, outstanding customer service, and a commitment to
              sustainability.
            </p>
            <div className="mt-16">
        <h2 className="mb-8 text-3xl font-bold">Our Location</h2>
        <div className="relative w-full h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d670.0185631890513!2d82.29261506979812!3d28.13258948234085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2snp!4v1732541853325!5m2!1sen!2snp"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="About Us"
            fill
            className="object-cover"
          />
        </div>
      </div>
      

      <div className="mt-16">
        <h2 className="mb-8 text-3xl font-bold">Why Choose Us</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="mb-2 text-xl font-semibold">Quality Products</h3>
            <p className="text-muted-foreground">
              We carefully select each item to ensure the highest quality standards.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="mb-2 text-xl font-semibold">Fast Shipping</h3>
            <p className="text-muted-foreground">
              Quick and reliable delivery to your doorstep worldwide.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="mb-2 text-xl font-semibold">24/7 Support</h3>
            <p className="text-muted-foreground">
              Our customer service team is always here to help you.
            </p>
          </Card>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-8 text-3xl font-bold">Our Team</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              name: "Raju Acharya",
              role: "CEO & Founder",
              image: "https://scontent.fkep4-1.fna.fbcdn.net/v/t39.30808-6/439110900_1159933591682486_4507279207773840666_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=c02J8PjczxAQ7kNvgHjZHwk&_nc_zt=23&_nc_ht=scontent.fkep4-1.fna&_nc_gid=Azz5_VSt9tarUTdmhH7nbEN&oh=00_AYAvuE4eHYKotgjlgLskf60MHhhlAQhacaVYtpPMPymaZA&oe=674A445C",
            },
            {
              name: "Kamal Acharya",
              role: "Creative Director",
              image: "../../public/kamal.jpg",
            },
            
          ].map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}