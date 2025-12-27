import ContactSection from '../components/ContactSection';

export default function Contact() {
    return (
        <div className="pt-20"> {/* Add padding top if needed for spacing from navbar in other layouts, though Section has py-16 */}
            <ContactSection />
        </div>
    );
}
