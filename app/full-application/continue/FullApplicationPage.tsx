'use client';

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/ui/accordion";

export default function FullApplicationPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<any>({});
  const [includeCoApplicant, setIncludeCoApplicant] = useState(false);

  useEffect(() => {
    const data: any = {};
    for (const [key, value] of searchParams.entries()) {
      data[key] = value;
    }
    setFormData((prev: any) => ({ ...prev, ...data }));
  }, [searchParams]);

  const handleChange = (e: any) => {
  const { name, value, type, checked } = e.target;

  const exclusivePairs: { [key: string]: string } = {
    ownCheckbox: "rentCheckbox",
    rentCheckbox: "ownCheckbox",
    coOwnCheckbox: "coRentCheckbox",
    coRentCheckbox: "coOwnCheckbox",
  };

  if (type === "checkbox" && exclusivePairs[name]) {
    setFormData((prev: any) => ({
      ...prev,
      [name]: checked,
      [exclusivePairs[name]]: false,
    }));
  } else {
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
};

  const renderInput = (name: string, label: string, type: string = "text") => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name] || ""}
        onChange={handleChange}
        className="mt-1 block w-full rounded-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
      alert(res.ok ? "Application submitted successfully" : "Submission failed");
    } catch (err) {
      console.error(err);
      alert("Error submitting application");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Full Credit Application
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Accordion type="single" collapsible defaultValue="section1">
          <AccordionItem value="section1">
            <AccordionTrigger>1. Personal Information</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-3 gap-4">
                {renderInput("firstName", "First Name")}
                {renderInput("middleName", "Middle Name")}
                {renderInput("lastName", "Last Name")}
                {renderInput("dob", "Date of Birth", "date")}
                {renderInput("sin", "SIN")}
                {renderInput("license", "Driver License #")}
                {renderInput("licenseExpiry", "License Expiry", "date")}
                {renderInput("maritalStatus", "Marital Status")}
                {renderInput("cellphone", "Cell Phone")}
                {renderInput("phone", "Phone")}
                {renderInput("email", "Email")}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section2">
            <AccordionTrigger>2. Address</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput("addressStreet", "Street")}
                {renderInput("addressCity", "City")}
                {renderInput("addressProvince", "Province")}
                {renderInput("addressPostalCode", "Postal Code")}
                {renderInput("addressDuration", "Time at Address")}
                {renderInput("previousAddress", "Previous Street")}
                {renderInput("previousCity", "Previous City")}
                {renderInput("previousProvince", "Previous Province")}
                {renderInput("previousPostalCode", "Previous Postal Code")}
                {renderInput("previousAddressDuration", "Previous Duration")}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section3">
            <AccordionTrigger>3. Housing</AccordionTrigger>
            <AccordionContent>
             <div className="flex gap-6 mb-4">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="ownCheckbox"
      checked={formData.ownCheckbox || false}
      onChange={handleChange}
    /> Own
  </label>
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="rentCheckbox"
      checked={formData.rentCheckbox || false}
      onChange={handleChange}
    /> Rent
  </label>
</div>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput("mortgageBalance", "Mortgage Balance")}
                {renderInput("mortgageHolder", "Mortgage Holder")}
                {renderInput("marketValue", "Market Value")}
                {renderInput("mortgageRentAmount", "Mortgage/Rent Amount")}
                {renderInput("landlordName", "Landlord Name")}
                {renderInput("landlordNumber", "Landlord Number")}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section4">
            <AccordionTrigger>4. Employment</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput("employer", "Employer")}
                {renderInput("employerAddress", "Employer Address")}
                {renderInput("jobTitle", "Job Title")}
                {renderInput("jobDuration", "Job Duration")}
                {renderInput("employerPhone", "Employer Phone")}
                {renderInput("natureOfBusiness", "Nature of Business")}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section5">
            <AccordionTrigger>5. Income</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput("income", "Annual Income")}
                {renderInput("otherIncome", "Other Income")}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section6">
            <AccordionTrigger>6. Previous Employment</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput("previousEmployer", "Previous Employer")}
                {renderInput("previousEmployerPhone", "Previous Employer Phone")}
                {renderInput("previousEmployerDuration", "Duration")}
                {renderInput("previousOccupation", "Occupation")}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section7">
            <AccordionTrigger>7. Co-Applicant</AccordionTrigger>
            <AccordionContent>
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={includeCoApplicant} onChange={() => setIncludeCoApplicant(!includeCoApplicant)} /> Include Co-Applicant
                </label>
              </div>
              {includeCoApplicant && (
                <div className="space-y-6">
                  <h3 className="font-semibold">Personal Info</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {renderInput("coFirstName", "First Name")}
                    {renderInput("coMiddleName", "Middle Name")}
                    {renderInput("coLastName", "Last Name")}
                    {renderInput("coDob", "Date of Birth", "date")}
                    {renderInput("coSin", "SIN")}
                    {renderInput("coLicense", "Driver License #")}
                    {renderInput("coLicenseExpiry", "License Expiry", "date")}
                    {renderInput("coMaritalStatus", "Marital Status")}
                    {renderInput("coPhone", "Phone")}
                    {renderInput("coEmail", "Email")}
                    {renderInput("coCellphone", "Cell Phone")}
                  </div>

                  <h3 className="font-semibold">Address</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {renderInput("coAddressStreet", "Street")}
                    {renderInput("coAddressCity", "City")}
                    {renderInput("coAddressProvince", "Province")}
                    {renderInput("coAddressPostalCode", "Postal Code")}
                    {renderInput("coAddressDuration", "Time at Address")}
                    {renderInput("coPreviousAddress", "Previous Address")}
                    {renderInput("coPreviousCity", "Previous City")}
                    {renderInput("coPreviousProvince", "Previous Province")}
                    {renderInput("coPreviousPostalCode", "Previous Postal Code")}
                    {renderInput("coPreviousAddressDuration", "Previous Duration")}
                  </div>

                  <div className="flex gap-6 mb-4">
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="coOwnCheckbox"
      checked={formData.coOwnCheckbox || false}
      onChange={handleChange}
    /> Own
  </label>
  <label className="flex items-center gap-2">
    <input
      type="checkbox"
      name="coRentCheckbox"
      checked={formData.coRentCheckbox || false}
      onChange={handleChange}
    /> Rent
  </label>
</div>

                  <h3 className="font-semibold">Housing</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {renderInput("coMortgageBalance", "Mortgage Balance")}
                    {renderInput("coMortgageHolder", "Mortgage Holder")}
                    {renderInput("coMarketValue", "Market Value")}
                    {renderInput("coMortgageRentAmount", "Mortgage/Rent Amount")}
                    {renderInput("coLandlordName", "Landlord Name")}
                    {renderInput("coLandlordNumber", "Landlord Number")}
                  </div>

                  <h3 className="font-semibold">Employment</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {renderInput("coEmployer", "Employer")}
                    {renderInput("coEmployerAddress", "Employer Address")}
                    {renderInput("coJobTitle", "Job Title")}
                    {renderInput("coJobDuration", "Duration")}
                    {renderInput("coEmployerPhone", "Employer Phone")}
                    {renderInput("coNatureOfBusiness", "Nature of Business")}
                  </div>

                  <h3 className="font-semibold">Income</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {renderInput("coIncome", "Annual Income")}
                    {renderInput("coOtherIncome", "Other Income")}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section8">
            <AccordionTrigger>8. Vehicle</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput("year", "Year")}
                {renderInput("make", "Make")}
                {renderInput("model", "Model")}
                {renderInput("kms", "KMS")}
                {renderInput("vin", "VIN")}
              </div>
              <div className="flex gap-4 mt-4">
                <label><input type="checkbox" name="damageOver2000" checked={formData.damageOver2000} onChange={handleChange} /> Damage over $2000</label>
                <label><input type="checkbox" name="rebuilt" checked={formData.rebuilt} onChange={handleChange} /> Rebuilt</label>
                <label><input type="checkbox" name="outOfProvince" checked={formData.outOfProvince} onChange={handleChange} /> Out of Province</label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section9">
            <AccordionTrigger>9. Trade-In</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-3 gap-4">
                {renderInput("tradeYear", "Trade Year")}
                {renderInput("tradeMake", "Trade Make")}
                {renderInput("tradeModel", "Trade Model")}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="section10">
            <AccordionTrigger>10. Summary</AccordionTrigger>
            <AccordionContent>
              <div className="grid md:grid-cols-2 gap-4">
                {renderInput("price", "Price")}
                {renderInput("docFee", "Doc Fee")}
                {renderInput("tradeValue", "Trade Value")}
                {renderInput("difference", "Difference")}
                {renderInput("balanceOwing", "Balance Owing")}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 border border-gray-200 p-4 rounded bg-white shadow-sm">
            <img src="/cloudflare-logo.png" alt="Cloudflare SSL" className="h-6 w-auto" />
            <p className="text-sm text-gray-700">
              Protected with SSL encryption and industry-grade security via Cloudflare.
            </p>
          </div>

          <p className="text-sm text-gray-600">
            By clicking submit, I consent to a credit check and certify that the information provided is accurate and complete to the best of my knowledge.
            A physical or digital signature will be collected prior to funding.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-none font-semibold hover:bg-blue-700 transition"
          >
            Submit Full Application
          </button>
        </div>

      </form>
    </div>
  );
}
