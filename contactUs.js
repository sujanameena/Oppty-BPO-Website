const locationData = {
    india: {
        name: "Hyderabad",
        address: "Hyderabad - Flat number 601, Mahitha's green galaxy, CBCID Colony, NRSA Colony, Bagath Singh Nagar Phase 2, Kukatpally, Hyderabad, Telangana 500085",
        details: "Our largest operational center with 24/7 support services."
    },
    canada: {
        name: "Canada",
        address: "145, King Street West, Suite 2701, Toronto, ON, M5H 1J8, Canada",
        details: "Strategic location for North American business expansion."
    },
    "south-africa": {
        name: "South Africa",
        address: "2nd & 3rd floor, Bridge Park, ERF 6993, Portion of ERF 6992, Montague Gardens, Century City, 7441, South Africa.Tel: +27 21 527 6600",
        details: "Gateway to African markets with diverse language capabilities."
    },
    australia: {
        name: "Australia",
        address: "OPPTY Global Services (Australia) Pty Ltd.Suite 13.03, Level 13,20 Berry Street,North Sydney, NSW 2060Tel: +61 2 8068 0676",
        details: "Key hub for Asia-Pacific operations and client management."
    },
    malaysia: {
        name: "Malaysia",
        address: "CEO Suite, 27th Floor Axiata Towers, Kuala Lumpur, Malaysia",
        details: "Strategic Southeast Asian operations center."
    },
    china: {
        name: "China",
        address: "Room 201, Building 22, No. 36 East Software Park Road, Dalian - 116023Tel: +86 411 3984 3199Fax: +86 411 3984 3145",
        details: "Essential hub for Chinese market penetration and growth."
    },
    usa: {
        name: "United States",
        address: "Global Headquarters:Jay Suites - New York, 515 Madison Avenue, 8th Floor, New York, NY 10022",
        details: "Primary North American headquarters with full-service capabilities."
    },
    poland: {
        name: "Poland",
        address: "C & D Building, Luzycka Office ParkGdynia, Poland",
        details: "European technical hub with specialized development teams."
    },
    switzerland: {
        name: "Switzerland",
        address: "OPPTY Value Edge AG,Bahnhofstraße 10, 6300 Zug,Switzerland",
        details: "Center of excellence for financial services and precision solutions."
    },
    turkey: {
        name: "Turkey",
        address: "Kozyatağı Mahallesi, Değirmen Sokak, 18-19/ B – Kozyatağı Nikakule Kat:10, Kadıköy İstanbulTel: +90 216 250 6529Fax: +90 216 250 6500",
        details: "Strategic bridge between European and Asian operations."
    },
    "costa-rica": {
        name: "Costa Rica",
        address: "3rd Floor, Building H, Forum Business Park, Santa Ana, San Jose, Costa Rica",
        details: "Specialized center for automotive and technology solutions."
    },
    uae: {
        name: "UAE",
        address: "Unit No. 3W, 113,West Wing, DAFZA, Dubai,United Arab Emirates",
        details: "Key player in the global BPO landscape with a skilled workforce."
    },
    philippines: {
        name: "Philippines",
        address: "9th and 10th Floors, 1880 Building, Eastwood City,Cyberpark, Bagumbayan, Quezon City 1100Tel: +632 318 2000",
        details: "South Asian coordination center with multilingual expertise."
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.location-dot');
    const labels = document.querySelectorAll('.location-label');
    
    // Support for multiple panels
    const panels = {
        panel1: {
            panel: document.getElementById('locationPanel'),
            locationName: document.getElementById('locationName'),
            locationAddress: document.getElementById('locationAddress'),
            exploreBtn: document.getElementById('exploreBtn'),
            careers_panel: document.getElementById('locationPanel1'),
            careers_hl: document.getElementById('careers-hl'),
        }
    };

    let currentLocation = null;
    let currentPanel = 'panel1';

    function showLocation(country, dotElement, panelId = 'panel1') {
        const data = locationData[country];
        if (!data || !panels[panelId] || !panels[panelId].panel) return;

        const panelElements = panels[panelId];
        
        // Clear active states
        dots.forEach(d => d.classList.remove('active'));
        labels.forEach(l => l.classList.remove('active'));

        if (dotElement) dotElement.classList.add('active');

        // Highlight corresponding label
        const label = document.querySelector('.location-label[data-country="' + country + '"]');
        if (label) label.classList.add('active');

        panelElements.locationName.textContent = data.name;
        panelElements.locationAddress.textContent = data.address;
        panelElements.careers_hl.textContent = data.name + ' Careers';

        panelElements.careers_panel.classList.add('show');
        panelElements.panel.setAttribute('aria-hidden', 'false');
        panelElements.panel.classList.add('show');
        panelElements.panel.setAttribute('aria-hidden', 'false');
        currentLocation = country;
        currentPanel = panelId;

        panelElements.exploreBtn.onclick = function() {
            alert('Exploring more about ' + data.name + ': ' + data.details);
        };
    }

    function hideAllPanels() {
        Object.values(panels).forEach(panelElements => {
            if (panelElements.panel) {
                panelElements.panel.classList.remove('show');
                panelElements.panel.setAttribute('aria-hidden', 'true');
                panelElements.careers_panel.classList.remove('show');
                panelElements.careers_panel.setAttribute('aria-hidden', 'true');
            }
        });
        dots.forEach(d => d.classList.remove('active'));
        labels.forEach(l => l.classList.remove('active'));
        currentLocation = null;
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.stopPropagation();
            const country = this.getAttribute('data-country');
            const panelId = this.getAttribute('data-panel') || 'panel1';
            showLocation(country, this, panelId);
        });
        dot.addEventListener('mouseenter', function() { 
            if (!this.classList.contains('active')) 
                this.style.transform = 'translate(-50%, -50%) scale(1.15)'; 
        });
        dot.addEventListener('mouseleave', function() { 
            if (!this.classList.contains('active')) 
                this.style.transform = 'translate(-50%, -50%) scale(1)'; 
        });
    });

    // Allow clicking label to behave like clicking the dot
    labels.forEach(label => {
        label.addEventListener('click', function(e) {
            e.stopPropagation();
            const country = this.getAttribute('data-country');
            const panelId = this.getAttribute('data-panel') || 'panel1';
            const dot = document.querySelector('.location-dot[data-country="' + country + '"]');
            if (dot) dot.click();
            else showLocation(country, null, panelId);
        });
    });

    // Close panels when clicking outside
    document.addEventListener('click', function(e) {
        const isClickOnPanel = Object.values(panels).some(panelElements => 
            panelElements.panel && panelElements.panel.contains(e.target)
        );
        
        if (!isClickOnPanel && 
            !e.target.classList.contains('location-dot') && 
            !e.target.classList.contains('location-label')) {
            hideAllPanels();
        }
    });

    // Auto-show India by default after 1.5 seconds (if present)
    setTimeout(() => {
        const indiaDot = document.querySelector('.location-dot.india');
        if (indiaDot) {
            indiaDot.click();
        }
    }, 1500);
});
