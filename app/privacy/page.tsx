import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Modern Shop",
  description: "Privacy policy and data protection information for Modern Shop",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      
      <div className="prose prose-neutral dark:prose-invert">
        <p className="lead">
          At Modern Shop, we take your privacy seriously. This Privacy Policy explains how we collect,
          use, and protect your personal information.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We collect information that you provide directly to us, including:
        </p>
        <ul>
          <li>Name and contact information</li>
          <li>Billing and shipping addresses</li>
          <li>Payment information</li>
          <li>Order history</li>
          <li>Communication preferences</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Process your orders and payments</li>
          <li>Communicate with you about your orders</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our products and services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Data Protection</h2>
        <p>
          We implement appropriate technical and organizational measures to protect
          your personal information against unauthorized access, alteration,
          disclosure, or destruction.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
          <li>Data portability</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our Privacy Policy, please contact us at:
          <br />
          Email: privacy@modernshop.com
          <br />
          Phone: 1-800-MODERN-SHOP
        </p>
      </div>
    </div>
  );
}