import { useState } from "react";

// i need to rename these css classed from table to just red stuff its going to cause a lot of issues later with the naming convention. also i would like to replicate the table in other sections with no red theme.

export const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    priority: "LOW",
    category: "BUG",
    description: "",
    title: "",
  });

  const InputData = [
    {
      id: "support-name",
      type: "text",
      name: "name",
      placeholder: "Your name",
      value: formData.name,
      required: true,
    },
    {
      id: "support-email",
      type: "email",
      name: "email",
      placeholder: "you@example.com",
      value: formData.email,
      required: true,
    },
    {
      id: "support-subject",
      type: "text",
      name: "title",
      placeholder: "Subject",
      value: formData.title,
      required: true,
    },
  ];

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Optional: Client-side validation before submit
  const handleValidation = (e: React.FormEvent) => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.title.trim()) newErrors.title = "Subject is required";
    if (!formData.description.trim())
      newErrors.description = "Message is required";
    if (Object.keys(newErrors).length > 0) {
      e.preventDefault();
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  };
  return (
    <div className="sub-container-red">
      <h2 className="ev-header-red">Send a Message</h2>
      <div className="p-4">
        <form
          className="flex flex-col gap-2"
          action="https://formsubmit.co/zynkah@far3.io"
          method="POST"
          onSubmit={handleValidation}
        >
          {InputData.map((field) => (
            <div key={field.id}>
              <input
                id={field.id}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={field.value}
                onChange={handleInputChange}
                required={field.required}
                className="input--full"
              />
            </div>
          ))}
          <div>
            <textarea
              id="support-message"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Message"
              rows={4}
              required
              className="input--full"
            />
          </div>
          <button type="submit" className="btn--table">
            Send Message
          </button>
          {/* Show validation errors */}
          {Object.values(errors).length > 0 && (
            <div className="text-red-500 mt-2">
              {Object.values(errors).map((err, idx) => (
                <div key={idx}>{err}</div>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
