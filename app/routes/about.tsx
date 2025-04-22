import coffeePic from "~/assets/sora-shimazaki-coffee.jpg";
import IconComponent from "~/components/Icon";
import styles from "../styles/common.module.css";

const About = () => {
  return (
    <>
      <h2>{`Hi there! I'm Corey Hatton.`}</h2>
      {/* 

       After growing up in the small town of Toodyay personifying the WA way of life, I've been a Perth or Perth-adjacent local for over 30 years. I moved to the big city at 18 to study at the University of Western Australia, where I got my Bachelor of Commerce degree in Marketing and Communications and haven't looked back since. Marketing and communications is my passion - and that won't be changing anytime soon!

        Before I took my passion for people-focused marketing to the next level and started branching out on my own, I took every opportunity to upskill in all things along the customer lifecycle. My journey took me from publishing my honours thesis on customer-business value co-creation to diving head-first into the corporate world – both in-house and as a consultant.
        
        My love for leveraging data to craft captivating content, optimise
          communications and implement effective internal and external
          engagement strategies translates to xxx.
          I've always had a knack for problem solving and am passionate about using data and analytics
          to optimise communications and drive growth - whether that's delivering internal employee engagement strategies or creating captivating content for your audience.

       Working in the communications and marketing industry for the last half decade means I've seen some of everything. Delving into an independent marcomms role and working directly with clients across WA and Australia has given me a unique perspective on what it takes to build effective and engaging communications strategies for all kinds of people and businesses. 

        Before I took my passion for people-focused marketing to the next level and started branching out on my own, I took every opportunity to upskill in all things along the customer lifecycle. My journey took me from publishing my honours thesis on customer-business value co-creation to diving head-first into the corporate world – both in-house and as a consultant.

Working with small and medium businesses, as well as a few of the industry heavyweights along the way, has given me a myriad of skills and knowledge that I love to share wherever I can. 
 
      */}

      {/* A focus on people and engagement isn’t only important when talking to customers and clients. Working with a mid-to-large Australian financial services organisation in their newly-formed Internal Communications Specialist role was a challenge (especially during the formative years of COVID). By putting the employees first, my team and I designed and implemented a brand-new internal comms strategy with four main pillars: Leadership & Purpose, Transparency & Trust, Diversity & Inclusion, and People’s Voice.

This strategy was backed up by my activities in:

Ghostwriting for executive leadership
Employee engagement and internal newsletter writing
Workshop facilitation and insights development
Employee survey design and implementation
Speech and script writing
Professional PowerPoint presentation design and templating */}

      {/* I’ve loved writing ever since I was in primary school. During my years studying at the University of Western Australia, I was able to use these skills to write and later publish my marketing thesis on value co-creation in a prominent academic journal.

After uni, I continued my professional career at a boutique market research agency, before continuing in a communications role at a medium-sized national finance brand. Over the years I've truly honed my skills in on all things communications and content from the ground up - absorbing every bit of the customer lifecycle throughout my career and learning from some of the best in the industry.
*/}
      {/* 3 MAIN REASONS */}
      {/* HORIZONTAL ROWS x3  */}
      <section className={styles.iconRows}>
        <h3>3 MAIN REASONS</h3>
        <div className={styles.coverLeft}>
          <img src={coffeePic} alt="" className="full-rows" />
          {/* full-rows bg image cover. 33%? */}
        </div>
        <ul>
          <li>
            <IconComponent iconifyIcon="ph:lightbulb-fill" />
            <p>
              {`Communication and transparency are core values of every project I
            work on. I believe that proactive communication and transparency are
            integral to creating successful content for successful businesses.
            Whether it’s tailor-made content briefs or unlimited rewrites until
            you’re 100% satisfied with the work before we publish, I make sure
            that every step of the project lifecycle lives and breathes
            collaboration and co-creation.`}
            </p>
          </li>
          <li>
            <IconComponent iconifyIcon="ph:lightbulb-fill" />
            <p>
              <strong>
                I understand what goes in and what comes out of your business
                planning.
              </strong>
              {` I’ve worked on both sides of the marketing equation –
            from in-house communications teams to agency-side consulting, I’ve
            got the knowledge and skills to provide quality content that
            audiences want to read, and businesses want to show.`}
            </p>
          </li>
          <li>
            <IconComponent iconifyIcon="ph:lightbulb-fill" />
            <p>{`I think like a marketer, but I write like a writer. That means
            that no matter the piece I’m writing, from that catchy bit of
            SEO-optimised web content to the most basic of product
            copywriting, people always come first. Converting readers to
            customers is no easy feat – but it gets a whole lot easier when
            they’re engaged with relevant, informative content tailored to
            their unique needs.`}</p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default About;
