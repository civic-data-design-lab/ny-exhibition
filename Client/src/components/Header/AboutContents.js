import React from 'react'
import styles from './AboutContents.module.css'
import typographyStyles from '../../styles/typography.module.css'
import sciamePng from '../../assets/02_Sciame_Logo_Black.png'
import { THEME_MAP } from '../../lib/constants'

const LegendItem = ({ backgroundColor }) => {
  return <div className={styles.legendItem} style={{ backgroundColor }} />
}

export const AboutContents = {
  about: (
    <>
      <h2 className={styles.h2}>How do you visualize NYC?</h2>
      <p className={styles.p}>
        We invite you to share your vision for New York City and be a part of Visualize NYC 2021. 16
        prompts and questions from experts in the design, policy, and environmental communities
        consider how to envision a better New York City for all. Your responses will become a part
        of a collective, interactive visualization of New Yorkers’ wants, needs, concerns, and
        dreams for the city.
      </p>
      <h2 className={styles.h2}>About the Project</h2>
      <p className={styles.p}>
        The next 12 months may be some of the most momentous in New York City’s history, with a
        confluence of events—including the ongoing coronavirus pandemic and an election with the
        potential to reshape the political landscape— creating major opportunities for change.
      </p>
      <p className={styles.p}>
        The November 2021 election will lead to an unprecedented amount of turnover in city
        government: In addition to the mayor, 40 elected officials will reach term limits, including
        four borough presidents and 34 City Council members. The number of open positions creates a
        singular opportunity for change in the five boroughs, and the incoming civic leaders will
        have the potential to remake the political landscape.
      </p>
      <p className={styles.p}>
        In response to this unique moment, AIA New York has partnered with MIT’s Civic Data Design
        Lab to undertake a web project titled{' '}
        <strong className={styles.strong}>Visualize NYC 2021</strong>. The project will explore
        issues in our city that we believe will be central in the 2021 local elections.
      </p>
      <h2 className={styles.h2}>Themes</h2>
      <h3 className={styles.h3}>
        Evolving Public Realm <LegendItem backgroundColor={THEME_MAP[1].color.fullTint} />
      </h3>
      <p className={styles.p}>
        Technology and COVID-19 have changed how we think about the public realm. This theme
        responds to these dynamic changes.
      </p>
      <h3 className={styles.h3}>
        Climate Change and Resilience <LegendItem backgroundColor={THEME_MAP[2].color.fullTint} />
      </h3>
      <p className={styles.p}>
        Climate change is one of the most urgent issues society faces. Decisions around the built
        environment must put climate at the forefront.
      </p>
      <h3 className={styles.h3}>
        Right to Housing <LegendItem backgroundColor={THEME_MAP[3].color.fullTint} />
      </h3>
      <p className={styles.p}>
        Access to affordable housing is one of the biggest challenges New Yorkers have faced in the
        last decade.
      </p>
      <h3 className={styles.h3}>
        Public Health <LegendItem backgroundColor={THEME_MAP[4].color.fullTint} />
      </h3>
      <p className={styles.p}>
        A city's health is dependent on the health of its public. This theme explores some of the
        current public health crises in which the new administration will need to address, including
        racism as a public health issue.
      </p>
      <h2 className={styles.h2}>Credits</h2>
      <p className={styles.p}>
        Visualize NYC 2021 is organized by AIANY and Center for Architecture with MIT’s Civic Data
        Design Lab (CDDL).
      </p>
      <p className={styles.p}>
        Special thank you to the experts who provided thought-provoking prompts -- read more about
        who they are in ‘Contributors’.
      </p>
      <p className={styles.p}>
        Special thank you to the CDDL Team: Sarah Williams (Director) Laura Kim (Project Manager);
        Adam Janicki, Esther Kim, Eunsu Kim, Prabhakar Kafle, Shi Tang.
      </p>
      <p className={styles.p}>
        Special thank you to the team at{' '}
        <a
          className={styles.a}
          href="https://accurat.it"
          title="Go to Accurat website"
          rel="noopener noreferrer"
          target="_blank"
        >
          Accurat
        </a>{' '}
        that developed the website in conversation with the CDDL Team.
      </p>
    </>
  ),
  contributors: (
    <>
      <h2 className={styles.h2}>Contributors</h2>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          David Burney, FAIA,Co-founder and Director, Urban Placemaking and Management, Pratt
          Institute School of Architecture.
        </span>{' '}
        The graduate MS program is the first in the country to focus on the emerging field of
        "placemaking" as an approach to urban and community design. He chairs the board of Project
        for Public Spaces (PPS), a nonprofit organization dedicated to helping people create and
        sustain public spaces that build strong communities. PPS is a central hub of the global
        placemaking movement, connecting people to ideas, resources and expertise. David Burney
        served as the Commissioner of the NYC Department of Design and Construction from 2004 to
        2014. Prior to that he was Director of Design and Capital Improvement of the New York City
        Housing Authority (NYCHA) from 1990 to 2003.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Susan Chin, FAIA, Hon. ASLA, Principal, DesignConnects.
        </span>{' '}
        Susan, an accomplished architect, urbanist and civic leader has formed an independent
        consultancy DesignConnects.  She recently led Design Trust for Public Space, that unlocks
        the potential of New York City’s public space since 1995. Prior to Design Trust, she was
        assistant commissioner for Capital Projects at NYC Department of Cultural Affairs,
        supporting architecture and public art citywide. She also served on the American Institute
        of Architects board, and as AIANY chapter president.  Her awards include: American Society
        of Landscape Architects Honorary Membership, AIANY State’s Kideney Gold Medal and Del
        Gaudio, and The Ohio State University’s Distinguished Alumna. Ms. Chin serves on NYC &
        Company Board of Directors, and East Midtown Governing Group.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Ifeoma Ebo, Founding Director and Urban Designer, Creative Urban Alchemy.
        </span>{' '}
        Ifeoma is an experienced Urban Designer, Strategist and Founding Director of Creative Urban
        Alchemy where she consults on equitable design and sustainable development strategy for city
        governments and civic institutions internationally. The diversity of her 20-year career
        emphasizes a commitment to social justice and design excellence.  She currently leads urban
        design and pre development initiatives for the Office of Neighborhood Strategies at HPD and
        previously led interagency design and built environment initiatives exploring the use of
        public space design to address community safety and social justice in marginalized
        communities across NYC for the Mayor’s Office of Criminal Justice.  She serves on Advisory
        Boards for the Mayor of Helsingborg, Sweden H22 Smart City Initiative, Association for
        Community Design and the BlackSpace Urbanist Collective. She has served as a Visiting Critic
        at Cornell University, Syracuse University and Columbia University.  Ifeoma holds a Bachelor
        of Architecture from Cornell University and a Master in City Design and Development from
        MIT.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Mindy Fullilove, MD, LFAPA, Hon. AIA, Professor of Urban Policy and Health, The New
          School.
        </span>
        Mindy is a social psychiatrist and professor of urban policy and health at The New School.
        Since 1986, she has conducted research on AIDS and other epidemics of poor communities, with
        a special interest in the relationship between the collapse of communities and decline in
        health. From her research, she has published numerous articles, book chapters, monographs,
        and books, including The House of Joshua: Meditations on Family and Place, RootShock: How
        Tearing Up City Neighborhoods Hurts America and What We Can Do About It, and Urban Alchemy:
        Restoring Joy in America’s Sorted-Out Cities. A third edition of Homeboy Came to Orange: A
        Story of People’s Power, which she helped her father, Ernest Thompson, write, was released
        in May 2018. She is co-author, with Hannah L. F. Cooper, of From Enforcers to Guardians: A
        Public Health Primer on Ending Police Violence. Her forthcoming book, Main Street: How a
        City’s Heart Connects Us All, will be released in October 2020.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>Claudia Herasme, Urban Designer.</span> Claudia
        is passionate about people and the cities we've built. Claudia served as Chief Urban
        Designer at the Department of City Planning (DCP) from 2017 to 2020. She possesses a deep
        understanding of NYC government with over 17 years of experience at DCP collaborating with a
        wide-range of city agencies, non-profit institutions and the community at large. Her
        expertise ranges from public space design and policy, streetscape regulations, active design
        and wellbeing guidelines, large-scale waterfront developments, and community engagement. Key
        projects include the Connected Community Guidebook, in collaboration with the New York
        Housing Authority; the Urban Design Principles for Planning in NYC; the Design Standards for
        Waterfront Public Access Areas. Claudia has been a guest critic and lecturer at academic
        institutions, and a jury of various design competitions and awards. She also serves at the
        AIA NY Board as a Public Director since 2018. Claudia holds a Master of Science in
        Architecture and Urban Design from Columbia University, and an Architecture degree from
        Universidad Nacional Pedro Henriquez Ureña in Santo Domingo, Dominican Republic.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Purnima Kapur, Planning Consultant, Urbanist.
        </span>{' '}
        Purnima has over 25 years of experience in City building. She is also an Adjunct Professor
        at Columbia University’s Graduate School of Planning and Architecture. Ms. Kapur serves as a
        Director on the Board of Trustees of the Hudson River Park Trust and the Skyscraper Museum,
        and on the Board of Advisors of Columbia University’s Center for Buildings Infrastructure
        and Public Space. She is the former Executive Director of the New York City Department of
        City Planning (DCP), where she oversaw the agency’s five Borough Offices as well as the
        Central Planning divisions. Ms. Kapur is one of the key architects of New York City’s
        groundbreaking Mandatory Inclusionary Housing regulation. Under her leadership, the City
        adopted five Integrated Neighborhood Plans in four boroughs, as well as an innovative plan
        for the redevelopment of Greater East Midtown. Ms. Kapur has been a key player in the
        redevelopment and transformation of Brooklyn over the past two decades. Under Mayor
        Bloomberg, she served as Director of DCP’s Brooklyn Borough Office from 2006-2014. She led
        high-priority and transformative projects, including the development of
        Greenpoint-Williamsburg waterfront, Downtown Brooklyn and Coney Island. In her role as
        Director of DCP’s Bronx Office from 2001-2006, she led the largest rezoning agenda in the
        borough’s history touching almost every neighborhood in the borough, from Yankee Stadium and
        Port Morris and Riverdale. Ms. Kapur is trained as an architect and a city planner, with
        dual Masters degrees from the Massachusetts Institute of Technology.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Jessica Katz, Executive Director, Citizens Housing and Planning Council.
        </span>{' '}
        Jessica joins CHPC from the New York City Department of Housing Preservation and
        Development, where she most recently served as the Associate Commissioner for New
        Construction. In that role she oversaw the creation of affordable and special needs
        housing—serving everyone from the formerly homeless to middle-income New Yorkers. Leading a
        team of more than 60 professionals, she has been responsible for an annual capital budget of
        more than $500 million and for creating thousands of much-needed units of housing. She has
        held a variety of roles at HPD, including as Assistant Commissioner of Special Needs
        Housing, Senior Advisor to the Commissioner, and Assistant Commissioner for Preservation
        Finance. Jessica began her career with HPD in 2003, and started as the Production Manager
        for Special Needs Housing, gaining in-depth experience in the creation of housing for our
        most vulnerable populations. She left HPD in 2009 to become the Executive Director of
        Lantern Community Services, a not-for-profit that operates social service programs in the
        Bronx, Brooklyn, and Manhattan as well as operating 1,000 units of permanent supportive
        housing.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          John Mandyck, Chief Executive Officer, Urban Green Council.
        </span>{' '}
        John joined Urban Green Council in 2018 as its first-ever CEO. He capped a 25-year career as
        Chief Sustainability Officer for United Technologies Corporation, a Fortune 45 global leader
        in the building, aerospace and food refrigeration industries. He also serves as a Visiting
        Scientist at the Harvard University T.H. Chan School of Public Health and an Adjunct
        Professor at the University of Connecticut School of Business. John is the founding chair of
        the Corporate Advisory Board for the World Green Building Council, a former board chair of
        Urban Green, and co-author of the book Food Foolish.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Justin Garrett Moore, Executive Director, New York City Public Design Commission.
        </span>{' '}
        Justin is a transdisciplinary designer and urbanist and serves as the executive director of
        the New York City Public Design Commission. He has extensive experience in architecture,
        urban design, and planning—from large-scale urban policies and projects to grassroots and
        community-based planning, design, and arts initiatives. At the Public Design Commission, his
        work focuses on prioritizing quality and excellence for the public realm and fostering
        accessibility, diversity, and inclusion in New York's public buildings, landscapes, and art.
        He is a member of the American Planning Association's AICP Commission, the Urban Design
        Forum, and the Black urbanist collective BlackSpace. Justin is an adjunct faculty member at
        Columbia University's Graduate School of Architecture, Planning and Preservation and the
        Yale School of Architecture. His social enterprise, Urban Patch, focuses on sustainable
        development through social and environmental design projects in the United States and
        Rwanda. He holds a Bachelor of Design from the University of Florida and a Master of
        Architecture and a Master of Science in Architecture and Urban Design from Columbia
        University.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Catherine Seavitt Nordenson, professor, director, Graduate Landscape Architecture Program,
          the Spitzer School of Architecture, City College of New York.
        </span>{' '}
        Her research and writing examines the impacts of power, activism, and public health on the
        equitable design of public landscapes.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Kate Orff, RLA, FASLA, Founding Principal, SCAPE.
        </span>{' '}
        Kate focuses on retooling the practice of landscape architecture relative to the uncertainty
        of climate change and creating spaces to foster social life, which she has explored through
        publications, activism, research, and projects. She is known for leading complex, creative,
        and collaborative work processes that advance broad environmental and social prerogatives.
        In 2017, Kate was awarded the prestigious MacArthur Foundation Fellowship, the first given
        in the field of landscape architecture; in 2019, she was elevated to the ASLA Council of
        Fellows. She is the author of several books including "Toward an Urban Ecology" (2016) and
        "Petrochemical America" (with Richard Misrach, 2012), and regularly writes and lectures
        worldwide about the role of landscape architecture and design to address the global
        challenges of climate change and social and environmental justice. She is also the Director
        of the Urban Design Program, Co-Director of the Center for Resilient Cities and Landscapes,
        and Professor at Columbia University’s Graduate School of Architecture, Planning and
        Preservation (GSAPP).
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Katherine W. Swenson, Senior Principal, MASS Design Group.
        </span>{' '}
        Katherine is a nationally recognized design leader, researcher, writer, and educator. She is
        a Senior Principal of MASS Design Group, an international non-profit architecture firm whose
        mission is to research, build, and advocate for architecture that promotes justice and human
        dignity. Before joining MASS in early 2020, Swenson was vice president of Design &
        Sustainability at Enterprise Community Partners, a national nonprofit organization that
        invests more than $8 billion annually in community development. Katie’s work explores how
        critical design practice can and should promote economic and social equity, environmental
        sustainability, and healthy communities.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Catherine Trapani, Executive Director, Homeless Services United.
        </span>{' '}
        Catherine has been working in the nonprofit sector for over 15 years.  She has been a leader
        in various coalitions advocating on behalf of homeless New Yorkers and has played a key role
        in monitoring policy developments and their effects on constituents while advocating for
        improved policies for and greater access to housing assistance for survivors of domestic
        violence and homeless families. She was a founding member of United to End Homelessness and
        a co-author of the Roadmap to Ending Homelessness, a member of the Housing for Vulnerable
        Families Coalition, a member of the Steering Committee and Co-Chair of the Housing Committee
        for the Coalition of Domestic Violence Residential Providers and Co-Chair of the Domestic
        Violence and Economic Justice Taskforce.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Claire Weisz, FAIA, Founding Partner, WXY.
        </span>{' '}
        Claire is known for their innovative approach to community, public space, structures, and
        cities. Claire was awarded the Medal of Honor from AIANY in 2018 and was honored with the
        Women in Architecture Award by Architectural Record in 2019. WXY is globally recognized for
        its place-based approach to architecture, urban design, and planning, and has played a vital
        role in design thinking around resiliency. In 2019 Fast Company named WXY one of the World’s
        Most Innovative Architecture Firms.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Richard C. Yancey, FAIA, LEED AP, founding Executive Director of the Building Energy
          Exchange (BE-Ex).
        </span>{' '}
        Building Energy Exchange is a nonprofit center of excellence that accelerates the transition
        to healthy, comfortable, and energy efficient buildings by serving as a resource and trusted
        expert to the building industry. Through education, exhibits, and actionable research, BE-Ex
        plays a central role in the climate action plans of both New York City and State, and
        advances high performance buildings globally, as the founding member of the United Nations
        ECE International Center of Excellence for High Performance Buildings. Prior to BE-Ex,
        Richard practiced architecture in Seattle and New York, leading a diverse array of
        award-winning commercial, institutional, and residential projects. He has lectured and is
        published widely; served on the NYC Mayor’s Climate Action Plan Technical Working Group; NYC
        Local Law 97 Climate Advisory Board Working Group on Building Technologies and Pathways; and
        received his Master of Architecture from Harvard University's Graduate School of Design.
      </p>
      <p className={styles.p}>
        <span className={typographyStyles.underline}>
          Kim Yao, AIA, Principal, Architecture Research Office.
        </span>{' '}
        Kim is Principal, with Stephen Cassell and Adam Yarinsky, of Architecture Research Office
        (ARO), a New York City firm dedicated to an architecture of strategy and intelligence with
        beauty and form. She is Adjunct Assistant Professor of Architecture at Columbia University’s
        Graduate School of Architecture, Planning and Preservation, and has also taught at the
        School of Constructed Environments, Parsons, the New School for Design and Barnard College
        (2001-2011). She is on the Executive Committee and Board for AIA New York and the Center for
        Architecture as the 2020 President of AIA New York. ARO’s diverse body of work has earned
        the firm over a hundred design awards including the 2020 National AIA Architecture Firm
        Award and the Smithsonian Cooper-Hewitt 2011 National Design Award.
      </p>
    </>
  ),
  sponsors: (
    <>
      <p className={styles.p}>Thank you to the 2020 AIANY President's Circle:</p>
      <h2 className={styles.h2}>Underwriter</h2>
      <a
        className={styles.a}
        href="https://sciame.com/"
        title="Go to Sciame website"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img className={styles.img} src={sciamePng} alt="Sciame logo" />
      </a>
      <h2 className={styles.h2}>Supporters</h2>
      <p className={styles.p}>
        1100 Architect, Andrew Berman Architect, FXCollaborative, Tillotson Design, International
        Lights, James McCullar Architecture, Langan, Moed de Armas & Shannon Architects, Murphy
        Burnham & Buttrick Architects, Pelli Clarke Pelli Architects, Perkins and Will, Robert A.M.
        Stern Architects, SHoP Architects, SPAN Architecture, STUDIOS Architecture, Thornton
        Tomasetti, W X Y architecture + urban design, Zetlin & De Chiara
      </p>
      <h2 className={styles.h2}>Sponsors</h2>
      <p className={styles.p}>
        Architecture Research Office, Arup Consulting Engineers, Dagher Engineering, Ennead
        Architects, Knoll, Inc. , L&L Holding Company, Loring Consulting Engineers, LTL Architects,
        NYU Office of Strategic Planning & Development, Skidmore, Owings and Merrill, Alice Tisch
      </p>
      <h2 className={styles.h2}>Friends</h2>
      <p className={styles.p}>
        Bernheimer Architecture, BIG NYC, Capalino + Company, Cooper Carry, Inc., Desai Chia
        Architecture, Jeanne Giordano Ltd, Kohler Ronan Consulting Engineers, RPO Inc., Solomonoff
        Architecture Studio, Spacesmith, Studio Joseph, The Donaldson Organization, Threshold
        Acoustics, WORK Architecture Company, Henry Zachary, Carol Loewenson, FAIA, LEED AP, Hayes
        Slade, AIA, Burton L. Roslyn, FAIA, Michael Plottel, FAIA, LEED AP, Construction
        Specifications, Inc., Iva Kravitz, Assoc. AIA, Thomas R. Krizmanic, AIA, John B. Simoni,
        Esq., Eve Klein and Robert Owens
      </p>
    </>
  ),
}
