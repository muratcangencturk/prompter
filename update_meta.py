import os, re, sys
from googletrans import Translator

descriptions = {
    'index': "Prompter is a free AI prompt generator for ChatGPT, Midjourney and more. Works offline after the first load to deliver fast, creative prompt ideas.",
    'blog': "Stay updated with Prompter news, AI insights, and creative prompt resources from our team.",
    'dm': "Generate and share creative prompts with friends in your direct message chats. Requires an internet connection.",
    'intro': "Learn how to get started with Prompter and create engaging AI prompts for ChatGPT and more.",
    'login': "Sign in to your Prompter account to save favorite prompts and sync them across devices.",
    'privacy': "Read how Prompter safeguards your data and privacy when using our AI prompt generator.",
    'pro': "Access advanced features in Prompter Pro for more powerful ChatGPT prompt generation. Requires an internet connection.",
    'profile': "View and manage your Prompter profile, update account settings, and access saved prompts.",
    'social': "Join our community with links to social platforms where Prompter users share AI prompts.",
    'space': "This page redirects you to the Prompter blog for the latest AI news and tips.",
    'terms': "Review the terms of service outlining acceptable use and policies for Prompter.",
    'top': "Discover Prompter's top users and best prompts ranked by community likes and saves.",
    'top-collectors': "See the most dedicated collectors on Prompter ranked by the number of prompts they've gathered.",
    'top-creators': "Meet Prompter's top creators whose prompts receive the most engagement and praise.",
    'top-prompts': "Browse the most popular Prompter prompts, sorted by user likes and saves.",
    'user': "Browse prompts shared by this user and learn more about their profile on Prompter.",
    '404': "We couldn't find the page you were looking for. Check the URL or return to Prompter's homepage."
}

keywords = {
    'index': "AI prompts, AI prompt generator, ChatGPT prompt builder, Midjourney prompt ideas, free AI prompts, creative writing prompts, text-to-image prompts",
    'blog': "Prompter blog, AI news, prompt tips, creative prompts, ChatGPT articles, Midjourney updates",
    'dm': "direct messages, private chat, prompt sharing, AI conversations, ChatGPT messaging",
    'intro': "Prompter guide, how to use, prompt tutorial, start generating AI prompts",
    'login': "login, sign in, prompt saver, save prompts, user account, prompt sync",
    'privacy': "privacy policy, data protection, user privacy, AI app security",
    'pro': "advanced prompts, Prompter Pro, premium features, ChatGPT tools, AI prompt generator",
    'profile': "profile, saved prompts, account settings, prompt history, user profile",
    'social': "community links, social media, share prompts, connect with users, AI community",
    'space': "blog redirect, Prompter blog, prompt articles",
    'terms': "terms of service, user agreement, service policies, Prompter rules",
    'top': "top prompts, best users, prompt rankings, popular prompts, trending prompts",
    'top-collectors': "top collectors, user rankings, most prompts collected, prompter fans",
    'top-creators': "top creators, prompt authors, high engagement, prompter rankings",
    'top-prompts': "most popular prompts, trending prompts, top prompt list",
    'user': "user profile, shared prompts, community member, prompt author",
    '404': "page not found, 404 error, missing page, prompter not found"
}

translator = Translator()

lang_dirs = {'': 'en', 'es': 'es', 'fr': 'fr', 'hi': 'hi', 'tr': 'tr', 'zh': 'zh-cn'}

for directory, lang_code in lang_dirs.items():
    for page in descriptions:
        filename = f"{page}.html" if page != '404' else '404.html'
        path = os.path.join(directory, filename) if directory else filename
        if not os.path.exists(path):
            continue
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()
        desc = descriptions[page]
        kw = keywords[page]
        if lang_code != 'en':
            desc = translator.translate(desc, dest=lang_code).text
            kw = translator.translate(kw, dest=lang_code).text
        # Replace description and keywords
        html = re.sub(r'(<meta\s+name="description"\s+content=")[^"]*("\s*/>)', r'\1' + desc + r'\2', html)
        html = re.sub(r'(<meta\s+property="og:description"\s+content=")[^"]*("\s*/>)', r'\1' + desc + r'\2', html)
        html = re.sub(r'(<meta\s+name="twitter:description"\s+content=")[^"]*("\s*/>)', r'\1' + desc + r'\2', html)
        html = re.sub(r'(<meta\s+name="keywords"\s+content=")[^"]*("\s*/>)', r'\1' + kw + r'\2', html)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print('Updated', path)

