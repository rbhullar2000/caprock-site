<form className="bg-white shadow-md rounded-lg p-6 space-y-6">
  <h1 className="text-2xl font-bold text-center mb-6">Pre-Approval Application</h1>

  <div>
    <label>Vehicle Type or Budget</label>
    <input name="vehicle" value={formData.vehicle} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Down Payment ($)</label>
    <input name="downPayment" value={formData.downPayment} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <hr />
  <h2 className="font-semibold text-lg">Personal Information</h2>

  <div>
    <label>Full Name</label>
    <input name="name" value={formData.name} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Date of Birth</label>
    <input name="dob" type="date" value={formData.dob} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Email</label>
    <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Phone Number</label>
    <input name="phone" value={formData.phone} onChange={handlePhoneChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Current Address</label>
    <input name="address" value={formData.address} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Time at Address (Years, Months)</label>
    <input name="addressDuration" value={formData.addressDuration} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <hr />
  <h2 className="font-semibold text-lg">Employment & Income</h2>

  <div>
    <label>Employer</label>
    <input name="employer" value={formData.employer} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Job Title</label>
    <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Time at Job (Years, Months)</label>
    <input name="jobDuration" value={formData.jobDuration} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Annual Income ($)</label>
    <input name="income" value={formData.income} onChange={handleChange} required className="w-full border p-3 rounded-md" />
  </div>

  <div>
    <label>Other Income (Optional)</label>
    <input name="otherIncome" value={formData.otherIncome} onChange={handleChange} className="w-full border p-3 rounded-md" />
  </div>

  <hr />
  <h2 className="font-semibold text-lg">Upload Documents</h2>

  <div>
    <label>Photo ID (Driver’s License)</label>
    <input name="idFile" type="file" onChange={handleChange} className="w-full border p-3 rounded-md bg-white" />
  </div>

  <div>
    <label>Recent Pay Stub</label>
    <input name="payStub" type="file" onChange={handleChange} className="w-full border p-3 rounded-md bg-white" />
  </div>

  <div className="flex items-start gap-2 mt-4">
    <input
      type="checkbox"
      name="creditConsent"
      checked={formData.creditConsent}
      onChange={handleChange}
      className="mt-1"
    />
    <label className="text-sm">I consent to a credit check for financing purposes.</label>
  </div>

  <div className="mt-6">
    <ReCAPTCHA sitekey="6LfrDyUrAAAAAIbl0Fc9plgs2jKxS6cBF7IYlHYj" onChange={() => setCaptcha(true)} />
  </div>

  <button
    type="button"
    onClick={() => setShowSummary(true)}
    className="mt-6 w-full bg-blue-600 text-white py-3 rounded font-semibold"
  >
    Continue to Review
  </button>
</form>
