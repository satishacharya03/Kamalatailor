import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Modern Shop",
  description: "Terms of service and conditions for using Modern Shop",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
      
      <div className="prose prose-neutral dark:prose-invert">
        <p className="lead">
          Welcome to Modern Shop. By accessing or using our services, you agree to
          be bound by these Terms of Service.
        </p>

        <h2>1. Account Terms</h2>
        <p>
          When you create an account with us, you must provide accurate and complete
          information. You are responsible for maintaining the security of your
          account and password.
        </p>

        <h2>2. General Conditions</h2>
        <p>
          We reserve the right to refuse service to anyone for any reason at any
          time. You understand that your content may be transferred unencrypted and
          involve transmissions over various networks.
        </p>

        <h2>3. Products and Services</h2>
        <p>
          We reserve the right to modify or discontinue any product or service
          without notice. Prices for our products are subject to change without
          notice. We shall not be liable to you or any third party for any
          modification, price change, suspension, or discontinuance of the service.
        </p>

        <h2>4. Payment Terms</h2>
        <p>
          You agree to provide current, complete, and accurate purchase and account
          information for all purchases made through our site. You agree to
          promptly update your account and other information so that we can
          complete your transactions and contact you as needed.
        </p>

        <h2>5. Returns and Refunds</h2>
        <p>
          Our return and refund policy is designed to ensure your satisfaction
          while protecting both parties. Please refer to our Returns Policy page
          for detailed information.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to update, change, or replace any part of these
          Terms of Service by posting updates and/or changes to our website. Your
          continued use of or access to the website following the posting of any
          changes constitutes acceptance of those changes.
        </p>

        <h2>Contact Information</h2>
        <p>
          Questions about the Terms of Service should be sent to us at:
          <br />
          Email: legal@modernshop.com
          <br />
          Phone: 1-800-MODERN-SHOP
        </p>
      </div>
    </div>
  );
}