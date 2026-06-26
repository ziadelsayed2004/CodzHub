import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { ContactRequest } from '@codzhub/shared';
import { usePageLoading } from '../hooks/usePageLoading.ts';
import SkeletonLoader from '../components/SkeletonLoader.tsx';
import TerminalWindow from '../components/TerminalWindow.tsx';
import CustomSelect from '../components/CustomSelect.tsx';

export default function Contact() {
  const { t, language } = useLanguage();
  const loading = usePageLoading();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budgetRange: '',
    timeline: '',
    message: '',
    referenceLink: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!formData.name.trim()) nextErrors.name = 'Required';
    if (!formData.email.trim()) {
      nextErrors.email = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Invalid email address';
    }
    if (!formData.projectType) nextErrors.projectType = 'Required';
    if (!formData.message.trim()) nextErrors.message = 'Required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitStatus('idle');

    const requestBody: ContactRequest = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || undefined,
      company: formData.company.trim() || undefined,
      projectType: formData.projectType,
      budgetRange: formData.budgetRange || undefined,
      timeline: formData.timeline || undefined,
      message: formData.message.trim(),
      referenceLink: formData.referenceLink.trim() || undefined,
      locale: language
    };

    try {
      const response = await fetch('/api/contact-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budgetRange: '',
          timeline: '',
          message: '',
          referenceLink: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="contact-page-container fade-in">
        <SkeletonLoader variant="form" />
      </div>
    );
  }

  return (
    <div className="contact-page-container fade-in">
      
      {/* Header */}
      <section className="container services-header">
        <span className="badge">Booking</span>
        <h1 className="hero-title">{t('contact.title')}</h1>
        <p className="hero-subtitle">{t('contact.subtitle')}</p>
      </section>

      {/* Form Section */}
      <section className="container form-container">
        <TerminalWindow title="intake@codzhub:~/book" noTilt={true}>
          {submitStatus === 'success' && (
            <div className="submit-success">
              {t('contact.success')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="submit-error">
              {t('contact.error')}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            
            <div className="form-row-2">
              {/* Name */}
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  {t('contact.formName')} <span className="required-star">*</span>
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  className={`input-field ${errors.name ? 'error' : ''}`}
                  value={formData.name} 
                  onChange={handleChange} 
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  {t('contact.formEmail')} <span className="required-star">*</span>
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  className={`input-field ${errors.email ? 'error' : ''}`}
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            <div className="form-row-2">
              {/* Phone */}
              <div className="form-group">
                <label className="form-label" htmlFor="phone">{t('contact.formPhone')}</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone" 
                  className="input-field" 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
              </div>

              {/* Company */}
              <div className="form-group">
                <label className="form-label" htmlFor="company">{t('contact.formCompany')}</label>
                <input 
                  type="text" 
                  id="company"
                  name="company" 
                  className="input-field" 
                  value={formData.company} 
                  onChange={handleChange} 
                />
              </div>
            </div>

            {/* Project Type */}
            <div className="form-group">
              <label className="form-label" htmlFor="projectType">
                {t('contact.formType')} <span className="required-star">*</span>
              </label>
              <CustomSelect
                id="projectType"
                name="projectType"
                value={formData.projectType}
                error={errors.projectType}
                onChange={handleChange}
                options={[
                  { value: 'web', label: t('contact.formTypeWeb') },
                  { value: 'api', label: t('contact.formTypeApi') },
                  { value: 'consult', label: t('contact.formTypeConsult') },
                  { value: 'other', label: t('contact.formTypeOther') }
                ]}
                placeholder={t('contact.formTypeSelect')}
              />
            </div>

            <div className="form-row-2">
              {/* Budget Range */}
              <div className="form-group">
                <label className="form-label" htmlFor="budgetRange">{t('contact.formBudget')}</label>
                <CustomSelect
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  options={[
                    { value: 'l1', label: t('contact.formBudgetL1') },
                    { value: 'l2', label: t('contact.formBudgetL2') },
                    { value: 'l3', label: t('contact.formBudgetL3') },
                    { value: 'l4', label: t('contact.formBudgetL4') }
                  ]}
                  placeholder={t('contact.formBudgetSelect')}
                />
              </div>

              {/* Timeline */}
              <div className="form-group">
                <label className="form-label" htmlFor="timeline">{t('contact.formTimeline')}</label>
                <CustomSelect
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  options={[
                    { value: 't1', label: t('contact.formTimelineT1') },
                    { value: 't2', label: t('contact.formTimelineT2') },
                    { value: 't3', label: t('contact.formTimelineT3') },
                    { value: 't4', label: t('contact.formTimelineT4') }
                  ]}
                  placeholder={t('contact.formTimelineSelect')}
                />
              </div>
            </div>

            {/* Reference Link */}
            <div className="form-group">
              <label className="form-label" htmlFor="referenceLink">{t('contact.formLink')}</label>
              <input 
                type="url" 
                id="referenceLink"
                name="referenceLink" 
                className="input-field" 
                placeholder={t('contact.formLinkPlaceholder')}
                value={formData.referenceLink} 
                onChange={handleChange} 
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label className="form-label" htmlFor="message">
                {t('contact.formDesc')} <span className="required-star">*</span>
              </label>
              <textarea 
                id="message"
                name="message" 
                className={`textarea-field ${errors.message ? 'error' : ''}`}
                placeholder={t('contact.formDescPlaceholder')}
                value={formData.message} 
                onChange={handleChange} 
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary btn-submit" 
              disabled={submitting}
            >
              {submitting ? t('contact.formSubmitting') : t('contact.formSubmit')}
            </button>

          </form>
        </TerminalWindow>
      </section>

    </div>
  );
}
