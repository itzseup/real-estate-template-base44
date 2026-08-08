export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-24 md:py-40 px-[4%] md:px-[2%] font-body">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-display text-display-xl font-light mt-3 mb-8">
          Terms of <span className="italic">Service</span>
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p>© 2024 Maison Estate. All rights reserved.</p>
          
          <h2 className="font-display text-xl font-light mb-4 mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Maison Estate website and services, you agree to be bound 
            by these Terms of Service. If you do not agree to all of the terms, you may not access 
            or use our services.
          </p>
          
          <h2 className="font-display text-xl font-light mb-4 mt-8">2. Services</h2>
          <p>
            Maison Estate provides real estate listing, buyer representation, seller advisory, 
            and related services. All services are subject to availability and change.
          </p>
          
          <h2 className="font-display text-xl font-light mb-4 mt-8">3. Property Listings</h2>
          <p>
            All property information provided on this website is obtained from sources believed 
            to be reliable, but we do not warrant or guarantee the accuracy, completeness, or 
            timeliness of any information. Property listings are subject to change or withdrawal 
            without notice.
          </p>
          
          <h2 className="font-display text-xl font-light mb-4 mt-8">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Maison Estate and its affiliates shall not be 
            liable for any indirect, incidental, special, consequential or punitive damages, or 
            any loss of data, use, goodwill, or other intangible loss.
          </p>
          
          <h2 className="font-display text-xl font-light mb-4 mt-8">5. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the 
            State of California, without regard to its conflict of law provisions.
          </p>
          
          <p className="mt-12 text-sm text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>
      </div>
    </div>
  )
}
